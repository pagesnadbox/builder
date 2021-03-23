import { mapActions, mapState } from 'vuex'

export default {
    inject: {
        config: {
            default: () => ({ editable: true }),
        },
    },
    props: {
        editable: {
            type: Boolean,
            default: true,
        },
    },
    components: {
        HomeSettings: () => import('@/layouts/home/Settings'),
    },
    data () {
        return {
            mouseover: false,
        }
    },
    computed: {
        ...mapState('settings', ['allowEdit', 'open']),
        listeners () {
            return {
                ...this.$listeners,
                ...this.getMixinListeners(),
            }
        },
        attrs () {
            return {
                ...this.$attrs,
                ...this.$props,
                class: this.mixinClasses,
            }
        },
        mixinClasses () {
            return [
                ...(this.classes || []),
                ...(this.hasHighlight ? ['hightlight'] : []),
            ]
        },
        hasHighlight () {
            return (this.allowEdit && this.mouseover)
        },
    },
    methods: {
        ...mapActions('settings', [
            'setOpen',
            'setComponentName',
            'addComponent',
            'removeComponent',
            'setComponents',
            'setComponentId',
        ]),
        ...mapActions('components', [
            'setItems',
        ]),
        getMixinListeners () {
            let listeners = {}

            if (this.editable && this.config.editable) {
                listeners = {
                    click: this.onClick.bind(this),
                    mouseenter: this.onMouseEnter.bind(this),
                    mouseleave: this.onMouseLeave.bind(this),
                }
            }

            return listeners
        },
        onMouseEnter (...args) {
            if (this.$listeners.mouseenter) {
                this.$listeners.mouseenter(...args)
            }
            this.mouseover = true
            this.addComponent({ name: this.$options.name, id: this.$attrs.id })
        },
        onMouseLeave (...args) {
            if (this.$listeners.mouseleave) {
                this.$listeners.mouseleave(...args)
            }

            this.mouseover = false
            this.removeComponent({ name: this.$options.name, id: this.$attrs.id })
        },
        onClick (...args) {
            if (this.$listeners.click) {
                this.$listeners.click(...args)
            }

            if (this.allowEdit) {
                const [event] = args
                const name = this.$options.name
                const id = this.$attrs.id

                this.setItems(this.items || [])

                event.preventDefault()
                event.stopPropagation()

                this.setComponentId(id)
                this.setComponentName(name)
                this.setComponents()

                if (!this.open) {
                    this.setOpen(true)
                }
            }
        },
    },
}

import { mapActions, mapState } from 'vuex'
import { EventBus, events } from "../../utils/eventBus"

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

    data() {
        return {
            mouseover: false,
        }
    },

    created() {
        this.clearHighlightBind = () => {
            if (this.isMobile) {
                this.clearHighligh();
            }
        }
    },

    computed: {
        ...mapState('settings', ['id', 'allowEdit', 'open', 'showHighlighter']),

        listeners() {
            return {
                ...this.$listeners,
                ...this.getMixinListeners(),
            }
        },

        attrs() {
            return {
                ...this.$attrs,
                ...this.$props,
                class: this.mixinClasses,
            }
        },

        mixinClasses() {
            return [
                ...(this.classes || []),
                ...(this.hasHighlight ? ['hightlight'] : []),
            ]
        },

        hasHighlight() {
            return (this.selected || (this.allowEdit && this.mouseover))
        },

        isDesktop() {
            return this.$vuetify.breakpoint.mdAndUp
        },

        isMobile() {
            return !this.isDesktop
        },

        selected() {
            return this.$attrs.id === this.id
        }
    },

    methods: {
        ...mapActions('settings', [
            'setOpen',
            'setComponent',
            'addComponent',
            'removeComponent',
            'setComponents',
        ]),

        ...mapActions('components', [
            'setItems',
        ]),

        getMixinListeners() {
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

        onMouseEnter(...args) {
            if (this.$listeners.mouseenter) {
                this.$listeners.mouseenter(...args)
            }

            if (this.isDesktop) {
                this.highligh()
            }
        },

        onMouseLeave(...args) {
            if (this.$listeners.mouseleave) {
                this.$listeners.mouseleave(...args)
            }

            if (this.isDesktop) {
                this.clearHighligh();
            }
        },

        highligh() {
            this.mouseover = true
            this.addComponent({ name: this.$options.name, id: this.$attrs.id })
        },

        clearHighligh() {
            this.mouseover = false
            this.removeComponent({ name: this.$options.name, id: this.$attrs.id })
        },

        onClick(...args) {
            if (this.$listeners.click) {
                this.$listeners.click(...args)
            }

            if (this.allowEdit) {
                const [event] = args
                const name = this.$options.name
                const id = this.$attrs.id

                if (this.isMobile) {
                    event.target.scrollIntoView({ behavior: "smooth" })

                    EventBus.$emit(events.CLEAR_COMPONENT_HIGHLIGHT)
                    this.highligh();
                    EventBus.$once(events.CLEAR_COMPONENT_HIGHLIGHT, this.clearHighlightBind)
                }

                this.setItems(this.items || [])

                event.preventDefault()
                event.stopPropagation()

                this.setComponent({ id, name })
                this.setComponents()

                if (!this.open) {
                    this.setOpen(true)
                }
            }
        },
    },
}

import { mapActions } from "vuex"

export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },

    },

    computed: {
        visible: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value)
            },
        },
    },

    methods: {
        ...mapActions("settings", ["setBottom"]),
    }

}

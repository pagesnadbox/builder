import Measurable from 'vuetify/lib/mixins/measurable'

export default {
  name: 'Heading',

  mixins: [Measurable],

  inject: {
    heading: {
      default: () => ({ align: 'left' }),
    },
  },

  provide () {
    return {
      heading: {
        align: this.align,
      },
    }
  },

  props: {
    align: {
      type: String,
      default () {
        return this.heading.align
      },
    },
  },

  computed: {
    styles () {
      const space = this.$vuetify.breakpoint.mdAndUp
        ? this.space
        : this.space / 2

      return {
        ...this.measurableStyles,
        padding: `${space}px 0`,
      }
    },
    justify () {
      switch (this.align) {
        case 'center': return 'center'
        case 'right': return 'end'
        default: return 'start'
      }
    },
  },
}

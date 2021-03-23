<template>
  <v-responsive
    class="base-divider"
    v-bind="attrs"
    :max-width="maxWidth"
    :style="styles"
    v-on="listeners"
  >
    <v-container>
      <v-row
        :justify="justify"
        class="px-4"
      >
        <slot />
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
// Mixins
  import mixin from './mixin'
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseResizeContainer',

    mixins: [Heading, mixin],

    props: {
      color: String,
      space: {
        type: [Number, String],
        default: 6,
      },
      align: String,
      maxWidth: String,
    },

    computed: {
      classes () {
        return [
          this.color,
          this.margin,
          `mb-${this.space}`,
          this.dense && 'base-divider--dense',
        ]
      },
      margin () {
        switch (this.align) {
          case 'left':
            return 'mr-auto'
          case 'right':
            return 'ml-auto'
          default:
            return 'mx-auto'
        }
      },
    },
  }
</script>

<style lang="sass">
.base-divider .v-divider
  border-width: 3px 0 0 0 !important

  .base-divider.base-divider--dense .v-divider
    border-width: 2px 0 0 0 !important
</style>

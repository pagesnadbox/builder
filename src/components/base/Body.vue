<template>
  <component
    :is="tag"
    :style="styles"
    class="base-body text-body-1"
    v-bind="attrs"
    v-on="listeners"
  >
    <!-- Only use v-html for user data -->
    <div
      v-if="text"
      v-text="text"
    />

    <div
      v-else-if="html"
      v-html="html"
    />

    <slot v-else />
  </component>
</template>

<script>
// Mixins
  import mixin from './mixin'
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseBody',

    mixins: [Heading, mixin],

    props: {
      html: String,
      maxWidth: {
        type: [Number, String],
        default: undefined,
      },
      space: {
        type: [Number, String],
        default: 10,
      },
      tag: {
        type: String,
        default: 'p',
      },
      dark: {
        type: Boolean,
        default: false,
      },
      align: {
        type: String,
      },
      text: String,
    },

    computed: {
      classes () {
        return [
          'grey--text',
          this.dark ? 'text--lighten-1' : 'text--darken-1',
          this.justify,
          `mb-${this.space}`,
        ]
      },
      justify () {
        return this.maxWidth ? this.margin : `text-${this.align}`
      },
      margin () {
        switch (this.align) {
          case 'left': return 'mr-auto'
          case 'right': return 'ml-auto'
          default: return 'mx-auto'
        }
      },
      styles () {
        return {
          maxWidth: `${this.maxWidth}px`,
        }
      },
    },
  }
</script>

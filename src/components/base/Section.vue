<template>
  <v-sheet
    :style="styles"
    tile
    v-bind="attrs"
    :color="color"
    v-on="listeners"
  >
    <slot />
  </v-sheet>
</template>

<script>
// Components
  import mixin from './mixin'
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseSection',

    mixins: [Heading, mixin],

    props: {
      space: {
        type: [Number, String],
        default: 0,
      },
      color: {
        type: String,
      },
    },

    computed: {

    },
  }
</script>

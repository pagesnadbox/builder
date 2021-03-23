<template>
  <v-icon
    :size="size"
    v-bind="attrs"
    v-on="listeners"
  >
    {{ icon || $slots.default }}
  </v-icon>
</template>

<script>
  import mixin from './mixin'

  export default {
    name: 'BaseIcon',

    mixins: [mixin],

    props: {
      size: {
        type: [Number, String],
        default: 56,
      },
      icon: {
        type: String,
      },
    },
  }
</script>

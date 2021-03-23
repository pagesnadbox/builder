<template>
  <v-img
    v-bind="attrs"
    v-on="listeners"
  >
    <slot />
  </v-img>
</template>

<script>
  import mixin from './mixin'

  export default {
    name: 'BaseImage',

    mixins: [mixin],
  }
</script>

<template>
  <v-app-bar
    id="home-app-bar"
    app
    elevation="1"
    elevate-on-scroll
    v-bind="attrs"
    v-on="listeners"
  >
    <slot />
  </v-app-bar>
</template>

<script>
  import mixin from './mixin'

  export default {
    name: 'BaseAppBar',

    mixins: [mixin],
  }
</script>

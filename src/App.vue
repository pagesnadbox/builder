<template>
  <v-fade-transition mode="out-in">
    <router-view />
  </v-fade-transition>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'App',
    metaInfo: {
      title: 'App',
      titleTemplate: '%s | Zero Pro',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    created () {
      window.addEventListener('wheel', (e) => e.stopPropagation())
    },
  }
</script>

<style>
.hightlight {
  outline: 4px dotted rgb(19, 196, 219) !important;
  outline-offset: -0.075rem !important;
  transform: scale(1.03);
  transition: transform 1.5s !important;
}
</style>

<style lang="sass">
.extra-padding
  padding-bottom: 96px !important
  padding-top: 96px !important

  @media screen and (max-width: 959px)
    padding-top: 48px !important
    padding-bottom: 48px !important
</style>

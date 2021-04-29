<template>
  <v-app class="ui-application">
    <home-settings />

    <home-gallery />

    <home-tools />
  </v-app>
</template>

<script>
export default {
  name: "TweakUI",

  components: {
    HomeSettings: () => import("@/layouts/home/Settings"),
    HomeTools: () => import("@/layouts/home/Tools"),
    HomeGallery: () => import("@/components/tweak/Gallery")
  },

};
</script>

<style scoped>
.ui-application {
  position: absolute;
}
</style>

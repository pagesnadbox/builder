<template>
  <v-app class="ui-application">
    <home-gallery />
  </v-app>
</template>

<script>
export default {
  name: "TweakUI",

  components: {
    HomeGallery: () => import("@/components/tweak/Gallery")
  },

};
</script>

<style scoped>
.ui-application {
  position: absolute;
}
</style>

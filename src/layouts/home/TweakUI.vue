<template>
  <v-app class="ui-application">
    <home-settings />

    <home-gallery @files-loaded="onFilesLoaded" />

    <home-tools />
  </v-app>
</template>

<script>
import { EventBus, events } from "../../utils/eventBus";

export default {
  name: "TweakUI",

  components: {
    HomeSettings: () => import("@/layouts/home/Settings"),
    HomeTools: () => import("@/layouts/home/Tools"),
    HomeGallery: () => import("@/components/tweak/Gallery")
  },

  methods: {
    async onFilesLoaded(files) {
      EventBus.$emit(events.GALLERY_IMAGES_LOADED, { files });
    }
  }
};
</script>

<style scoped>
.ui-application {
  position: absolute;
}
</style>

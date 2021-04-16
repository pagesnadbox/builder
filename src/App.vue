<template>
  <v-app>
    <!-- <v-app-bar> </v-app-bar> -->

    <v-container fluid style="height: 100vh" class="pa-0 ma-0">
      <v-row class="fill-height pa-0 ma-0" no-gutters>
        <v-col
          :cols="engineCols"
          :xs="engineXs"
          :md="engineMd"
          :lg="engineLg"
          :xl="engineXl"
          class="fill-height"
        >
          <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            height="100%"
          >
            <v-container fluid class="pa-0">
              <div id="engine" :class="classes"></div>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col v-if="hasRightContainer" class="fill-height">
          <v-sheet
            id="scrolling-techniques-3"
            class="overflow-y-auto"
            height="100%"
          >
            <v-container class="px-10">
              <SettingsContainer />
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <TweakUI />
  </v-app>
</template>

<script>
import SettingsContainer from "@/layouts/home/SettingsContainer";
import TweakUI from "./layouts/home/TweakUI";
import { mapState } from "vuex";
import { EventBus } from './utils/eventBus';
console.error("here")
export default {
  components: {
    SettingsContainer,
    TweakUI
  },
  name: "App",
  computed: {
    ...mapState("settings", ["compact", "open"]),
    classes() {
      const classess = ["engine-wrapper"];
      if (!this.hasRightContainer) {
        // classess.push("scale-engine");
      }
      return classess;
    },
    engineCols() {
      return this.hasRightContainer ? "4" : "12";
    },
    engineMd() {
      return this.hasRightContainer ? "6" : "12";
    },
    engineXs() {
      return this.hasRightContainer ? "4" : "12";
    },
    engineLg() {
      return this.hasRightContainer ? "8" : "12";
    },
    engineXl() {
      return this.hasRightContainer ? "10" : "12";
    },
    hasRightContainer() {
      return this.open && !this.compact && this.isDesktop;
    },
    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },

  created() {
    window.addEventListener("wheel", e => e.stopPropagation());

    window.addEventListener("keydown", e => EventBus.$emit("on-keydown", e));
    window.addEventListener("keyup", e => EventBus.$emit("on-keyup", e));

    window.addEventListener("mousemove", e =>
      EventBus.$emit("on-mousemove", e)
    );
    window.addEventListener("mouseup", e => EventBus.$emit("on-mouseup", e));

    window.addEventListener("touchmove", e =>
      EventBus.$emit("on-mousemove", e)
    );
    window.addEventListener("touchend", e => EventBus.$emit("on-mouseup", e));
  }
};
</script>

<style lang="sass" scoped>
.scale-engine
  width: 100vw
  transform: scale(0.325)
  transform-origin: top left
</style>

<style>
.hightlight {
  outline: 4px dotted rgb(19, 196, 219) !important;
  outline-offset: -0.075rem !important;
  /* transform: scale(1.03); */
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

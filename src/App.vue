<template>
  <v-app :class="{ dark: $vuetify.theme.dark }">
    <v-navigation-drawer app v-model="drawer">
      <v-list dense rounded>
        <v-list-item v-for="item in links" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar outlined flat app absolute v-if="meta.hasAppBar">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ meta.appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <base-editable-project-dialog></base-editable-project-dialog>

    <base-confirm-modal></base-confirm-modal>

    <base-custom-snackbar></base-custom-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { EventBus, events } from "./utils/eventBus";

export default {
  name: "App",

  data() {
    return {
      drawer: true,
      links: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" }
      ]
    };
  },

  computed: {
    ...mapState("engine", ["data"]),
    meta() {
      return this.$route.meta;
    }
  },

  watch: {
    data: {
      deep: true,
      handler: "onDataChange"
    },
    "data.app.dark": {
      handler: "onThemeChange",
      immediate: true
    }
  },

  methods: {
    onThemeChange(value) {
      this.$vuetify.theme.dark = value;
    },
    onDataChange() {
      EventBus.$emit(events.DATA_CHANGE);
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

*
  --thumbBG: #c4c8cd

.dark *
  --thumbBG: #3f4143


*::-webkit-scrollbar, *::-webkit-scrollbar
  width: 4px

*
  scrollbar-width: thin
  scrollbar-color: var(--thumbBG) var(--scrollbarBG)


*::-webkit-scrollbar-track, *::-webkit-scrollbar-track
  background: var(--scrollbarBG)


*::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb
  background-color: var(--thumbBG)
  border-radius: 6px
  border: 3px solid var(--scrollbarBG)
</style>

<template>
  <v-app>
    <v-navigation-drawer v-if="meta.hasDrawer" app v-model="drawer">
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

    <v-app-bar color="transparent" outlined flat app v-if="meta.hasAppBar">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ meta.appTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch
        label="Dark"
        v-model="$vuetify.theme.dark"
        class="mt-5 mr-10"
      ></v-switch>
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
import { EventBus } from "./utils/eventBus";

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
    meta() {
      return this.$route.meta;
    }
  },

  watch: {
    "$vuetify.theme.dark": "onThemeChange"
  },

  methods: {
    onThemeChange(value) {
      localStorage.setItem("pagesandbox_theme_dark", value);
    }
  },

  created() {
    const isDark = localStorage.getItem("pagesandbox_theme_dark") !== "false";
    this.$nextTick(() => {
      this.$vuetify.theme.dark = isDark;
    });

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

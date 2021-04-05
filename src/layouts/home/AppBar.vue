<template>
  <div id="home">
    <base-app-bar
      id="app-bar"
      app
      elevation="1"
      elevate-on-scroll
      v-bind="data.bar"
      :color="color"
    >
      <base-vuetify-img
        id="app-bar-logo"
        v-bind="data.bar.logo"
        contain
        :dark="data.bar.dark"
      />

      <base-heading class="ml-4" v-bind="data.bar.heading"></base-heading>

      <v-spacer />

      <div>
        <v-tabs
          class="hidden-sm-and-down"
          optional
          background-color="transparent"
          :value="0"
        >
          <v-tab
            v-for="({ id, title }, i) in items"
            :key="i"
            :exact="title === 'Home'"
            :ripple="false"
            class="font-weight-bold"
            min-width="96"
            text
            @click="onItemClick(id)"
          >
            {{ title }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </base-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="`${item.id}-${index}`"
          link
          item
          @click="onItemClick(item.id)"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "HomeAppBar",

  data: () => ({
    drawer: null
  }),

  computed: {
    ...mapState("app", ["data"]),
    ...mapGetters("app", ["itemsFormatted"]),
    itemsFormattedExluded() {
      return this.itemsFormatted.filter(i => ["hero"].indexOf(i.key) === -1);
    },
    items() {
      return [...this.defaultItems, ...this.itemsFormattedExluded];
    },
    defaultItems() {
      return [
        {
          title: "Home",
          id: "home"
        }
      ];
    },
    color() {
      if (this.data.bar.color) {
        return this.data.bar.color;
      }

      return this.$vuetify.theme.isDark ? "#000" : "#fff";
    }
  },

  methods: {
    onItemClick(id) {
      this.$vuetify.goTo(`#${id}`);
      this.drawer = false;
    }
  }
};
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

    .v-tab
      &::before
        display: none
</style>

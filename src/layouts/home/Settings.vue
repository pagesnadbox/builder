<template>
  <div>
    <v-card
      id="settings"
      class="py-2 px-4"
      color="#0000004D"
      dark
      flat
      style="position: fixed; top: 104px; right: -35px; z-index: 10"
      width="100"
      @click="menu = !menu"
    >
      <v-icon large>
        mdi-cog
      </v-icon>
    </v-card>

    <component :is="settingsComponent" v-model="menu">
      <v-card-text ref="scrollableContainer">
        <v-tabs class="px-4 pb-1" fixed-tabs v-model="tab">
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab :key="0">Tree</v-tab>
          <v-tab :key="1">Properties</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="0">
            <v-card flat>
              <v-card-text>
                <Tree />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="1">
            <v-card flat>
              <v-card-text>
                <SettingsContainer />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </component>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SettingsContainer from "@/layouts/home/SettingsContainer";
import SettingsModal from "@/components/tweak/SettingsModal";
import SettingsBottomSheet from "@/components/tweak/SettingsBottomSheet";

import Tree from "./Tree";

export default {
  name: "HomeSettings",

  data() {
    return {
      tab: null
    };
  },

  components: {
    SettingsContainer,
    SettingsModal,
    SettingsBottomSheet,
    Tree
  },

  watch: {
    id() {
      !this.isDesktop &&
        this.$refs.scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  computed: {
    ...mapState("settings", ["open", "compact", "bottom"]),

    settingsComponent() {
      return !this.isDesktop || this.bottom
        ? SettingsBottomSheet
        : SettingsModal;
    },

    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    menu: {
      get() {
        return this.open && (this.compact || !this.isDesktop);
      },
      set() {
        this.setOpen(!this.open);
      }
    }
  },

  methods: {
    ...mapActions("settings", ["setOpen"])
  }
};
</script>

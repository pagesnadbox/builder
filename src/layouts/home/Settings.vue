<template>
  <div>
    <v-card
      id="settings"
      class="py-2 px-4"
      color="#0000004D"
      dark
      flat
      style="position: fixed; top: 104px; right: -35px; z-index: 5"
      width="100"
      @click="menu = !menu"
    >
      <v-icon large>
        mdi-cog
      </v-icon>
    </v-card>

    <component :is="settingsComponent" v-model="menu">
      <v-card-text ref="scrollableContainer">
        <SettingsContainer />
      </v-card-text>
    </component>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SettingsContainer from "@/layouts/home/SettingsContainer";
import SettingsModal from "@/components/tweak/SettingsModal";
import SettingsBottomSheet from "@/components/tweak/SettingsBottomSheet";

export default {
  name: "HomeSettings",

  components: {
    SettingsContainer,
    SettingsModal,
    SettingsBottomSheet
  },

  watch: {
    id() {
      !this.isDesktop &&
        this.$refs.scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  computed: {
    ...mapState("settings", ["open", "compact"]),

    settingsComponent() {
      return this.isDesktop ? SettingsModal : SettingsBottomSheet;
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

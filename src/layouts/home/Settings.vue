<template>
  <div>
    <v-sheet
      :dark="$vuetify.breakpoint.mobile"
      color="transparent"
      id="settings"
      class="text-center"
    >
      <v-icon class="my-3" large @click="menu = !menu">
        mdi-cog
      </v-icon>
    </v-sheet>

    <component :is="settingsComponent" v-model="menu">
      <v-card-text ref="scrollableContainer">
        <SettingsTabs />
      </v-card-text>
    </component>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SettingsTabs from "./SettingsTabs";
import SettingsModal from "@/components/tweak/SettingsModal";
import SettingsBottomSheet from "@/components/tweak/SettingsBottomSheet";

export default {
  name: "HomeSettings",

  components: {
    SettingsTabs,
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

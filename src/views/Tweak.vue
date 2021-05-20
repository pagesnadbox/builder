<template>
  <div>
    <v-container fluid style="height: 100vh" class="pa-0 ma-0">
      <v-row class="fill-height pa-0 ma-0" no-gutters>
        <v-col v-if="hasRightContainer" class="fill-height">
          <v-sheet height="100%" class="fill-height pa-2 overflow-hidden">
            <SettingsTabs />
          </v-sheet>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col
          :cols="engineCols"
          :xs="engineXs"
          :md="engineMd"
          :lg="engineLg"
          :xl="engineXl"
          class="fill-height"
        >
          <v-sheet class="overflow-y-auto" height="100%">
            <iframe
              @load="onWindowLoaded"
              src="http://localhost:8080/"
              width="100%"
              height="100%"
              id="engine"
              ref="engineSlot"
              frameborder="0"
            ></iframe>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <TweakUI />
  </div>
</template>

<script>
import { mapState } from "vuex";

import SettingsTabs from "@/layouts/home/SettingsTabs";

import Tree from "@/layouts/home/Tree";

import TweakUI from "@/layouts/home/TweakUI";
import { EventBus, events } from "../utils/eventBus";

export default {
  components: {
    SettingsTabs,
    Tree,
    TweakUI
  },

  computed: {
    ...mapState("settings", ["compact", "open"]),

    classes() {
      const classess = ["engine-wrapper"];
      return classess;
    },

    engineCols() {
      return this.hasRightContainer ? "6" : "12";
    },

    engineXs() {
      return this.hasRightContainer ? "6" : "12";
    },

    engineMd() {
      return this.hasRightContainer ? "8" : "12";
    },

    engineLg() {
      return this.hasRightContainer ? "9" : "12";
    },

    engineXl() {
      return this.hasRightContainer ? "9" : "12";
    },

    hasRightContainer() {
      return this.open && !this.compact && this.isDesktop;
    },

    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },

  methods: {
    onWindowLoaded() {
      EventBus.$emit(events.ENGINE_SLOT_RENDERED, {
        slot: this.$refs.engineSlot
      });
      EventBus.$emit(events.PROJECT_SELECTED);
    }
  }
};
</script>

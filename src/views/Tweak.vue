<template>
  <div>
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
          <v-sheet class="overflow-y-auto" height="100%">
            <v-container fluid class="pa-0">
              <div id="engine" ref="engineSlot" :class="classes"></div>
            </v-container>
          </v-sheet>
        </v-col>
        <v-col v-if="hasRightContainer" class="fill-height">
          <v-sheet height="100%" class="fill-height pa-2 overflow-hidden">
            <v-row no-gutters class="fill-height">
              <v-col cols="5" class="pr-3">
                <Tree />
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="7" class="px-1 fill-height">
                <v-sheet height="100%" class="fill-height pa-2 overflow-hidden">
                  <SettingsContainer :scrollable="true" />
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <TweakUI />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import SettingsContainer from "@/layouts/home/SettingsContainer";

import Tree from "@/layouts/home/Tree";

import TweakUI from "@/layouts/home/TweakUI";
import { EventBus, events } from "../utils/eventBus";

export default {
  components: {
    SettingsContainer,
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
      return this.hasRightContainer ? "4" : "12";
    },

    engineXs() {
      return this.hasRightContainer ? "4" : "12";
    },

    engineMd() {
      return this.hasRightContainer ? "6" : "12";
    },

    engineLg() {
      return this.hasRightContainer ? "7" : "12";
    },

    engineXl() {
      return this.hasRightContainer ? "8" : "12";
    },

    hasRightContainer() {
      return this.open && !this.compact && this.isDesktop;
    },

    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },

  mounted() {
    this.setCurrent({ id: this.$route.params.id });

    EventBus.$emit(events.ENGINE_SLOT_RENDERED, {
      slot: this.$refs.engineSlot
    });
  },

  methods: {
    ...mapActions("projects", ["setCurrent"])
  }
};
</script>

<template>
  <div>
    <v-container fluid style="height: 100vh" class="pa-0 ma-0">
      <v-row class="fill-height pa-0 ma-0" no-gutters>
        <v-col
          :cols="settingsCols"
          :xs="settingsXs"
          :md="settingsMd"
          :lg="settingsLg"
          :xl="settingsXl"
          v-if="hasRightContainer"
          class="fill-height"
        >
          <v-sheet
            style="border-right: 1px solid #8080806b"
            height="100%"
            class="fill-height pa-2 overflow-hidden"
          >
            <SettingsTabs />
          </v-sheet>
        </v-col>
        <v-col
          :cols="engineCols"
          :xs="engineXs"
          :md="engineMd"
          :lg="engineLg"
          :xl="engineXl"
          class="fill-height"
        >
          <v-sheet class="overflow-y-auto" height="100%">
            <div style="height:50px" v-if="!fullscreen">
              <v-container>
                <v-row justify="center" align="center" class="fill-height">
                  <v-col cols="6" sm="2">
                    <v-select
                      dense
                      outlined
                      offset-y
                      label="Device"
                      :items="devices"
                      v-model="selectedDevice"
                      return-object
                      item-text="name"
                    ></v-select>
                  </v-col>
                  <v-col cols="3" sm="2">
                    <v-text-field
                      type="number"
                      dense
                      outlined
                      v-model="width"
                      label="Width"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" sm="2">
                    <v-text-field
                      type="number"
                      dense
                      outlined
                      v-model="height"
                      label="Height"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </div>

            <div class="iframe-wrapper-outer" :class="{ 'pa-5': !fullscreen }">
              <iframe
                :style="styles"
                @load="onWindowLoaded"
                :src="engineUrl"
                width="100%"
                height="100%"
                id="engine"
                ref="engineSlot"
                frameborder="0"
              ></iframe>
            </div>
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

const devices = [
  { name: "iPhone XR", size: "414x896" },
  { name: "iPhone XS", size: "375x812" },
  { name: "iPhone XS Max", size: "414x896" },
  { name: "iPhone X", size: "375x812" },
  { name: "iPad Pro", size: "1024x1366" },
  { name: "Google Pixel 4 XL", size: "412x869" },
  { name: "Samsung Galaxy Note 10+", size: "412x869" },
  { name: "Samsung Galaxy Note 10", size: "412x869" },
  { name: "Samsung Galaxy Note 9", size: "360x740" },
  { name: "Samsung Galaxy S9+", size: "360x740" },
  { name: "Samsung Galaxy S9", size: "360x740" },
  { name: "Nexus 9", size: "768x1024" },
  { name: "Nexus 7 (2013)", size: "600x960" },
  { name: "Pixel C", size: "900x1280" }
];

export default {
  data() {
    return {
      devices: devices,
      localWidth: 0,
      localHeight: 0,
      selectedDevice: null
    };
  },

  components: {
    SettingsTabs,
    Tree,
    TweakUI
  },

  watch: {
    selectedDevice(device) {
      const [width, height] = device.size.split("x");
      this.width = width;
      this.height = height;
    }
  },

  computed: {
    ...mapState("settings", ["compact", "open", "fullscreen", "engineUrl"]),

    width: {
      get() {
        return this.localWidth;
      },
      set(value) {
        this.preventNextResizeObserve = true;
        this.localWidth = value;
      }
    },

    height: {
      get() {
        return this.localHeight;
      },
      set(value) {
        this.preventNextResizeObserve = true;
        this.localHeight = value;
      }
    },

    styles() {
      return {
        width: "100%",
        height: "100%",
        ...(!this.fullscreen ? this.resizeStyles : {})
      };
    },

    frameWrapperstyles() {
      return {};
    },

    resizeStyles() {
      return {
        resize: "both",
        "max-width": "100%",
        "max-height": "95%",
        width: this.width ? `${this.width}px` : "100%",
        height: this.height ? `${this.height}px` : "100%",
        border: "1px solid #8080806b"
      };
    },

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
      return this.hasRightContainer ? "8" : "12";
    },

    engineXl() {
      return this.hasRightContainer ? "10" : "12";
    },

    settingsCols() {
      return "6";
    },

    settingsXs() {
      return "6";
    },

    settingsMd() {
      return "4";
    },

    settingsLg() {
      return "4";
    },

    settingsXl() {
      return "2";
    },

    hasRightContainer() {
      return this.open && !this.compact && this.isDesktop;
    },

    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    }
  },

  created() {
    this.preventNextResizeObserve = true;
    this.resizeObserver = new ResizeObserver(entries => {
      const contentRect = entries[0].contentRect;

      if (this.preventNextResizeObserve) {
        this.preventNextResizeObserve = false;
        return;
      }

      this.width = contentRect.width;
      this.height = contentRect.height;
    });
  },

  methods: {
    onWindowLoaded() {
      console.error("herereredata-v-568b3622");
      this.resizeObserver.observe(this.$refs.engineSlot);
      EventBus.$emit(events.ENGINE_SLOT_RENDERED, {
        slot: this.$refs.engineSlot
      });
      EventBus.$emit(events.PROJECT_SELECTED);
    }
  }
};
</script>

<style scoped>
.iframe-wrapper-outer {
  width: 100%;
  height: calc(100% - 65px);
  display: flex;
  justify-content: center;
}
</style>

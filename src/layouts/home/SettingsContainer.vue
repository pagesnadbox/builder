<template>
  <div style="display: flex; flex-flow: column;" class="fill-height">
    <div style="flex: 0 1 auto;">
      <v-btn color="primary" block dark @click="onAppSettinsClick">
        <v-icon left>
          mdi-tools
        </v-icon>
        Application Settings
      </v-btn>

      <v-divider class="my-6" />
      <div>
        <v-expansion-panels flat v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header class="pa-0">
              Settings
            </v-expansion-panel-header>
            <v-expansion-panel-content class="px-0">
              <h3 align="center" title="Theme Colors" space="0" />

              <tweak-color
                id="colors"
                v-model="currentThemePrimary"
                :showPrimary="false"
              />

              <v-divider class="my-6" />
              <!-- 
              <v-switch
                id="edtiSwitch"
                v-model="allowEditModel"
                class="mr-4"
                label="Toggle edit Mode"
              ></v-switch> -->

              <v-btn
                class="mr-4"
                color="primary"
                :outlined="engineDark"
                @click="engineDark = false"
              >
                <v-icon left>
                  mdi-white-balance-sunny
                </v-icon>
                Light
              </v-btn>

              <v-btn
                color="primary"
                :outlined="!engineDark"
                @click="engineDark = true"
              >
                <v-icon left>
                  mdi-weather-night
                </v-icon>
                Dark
              </v-btn>

              <br />
              <br />

              <v-menu v-if="history.length" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    block
                    tile
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-dots-vertical
                    </v-icon>
                    {{ history.length }} Selected history
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in history"
                    :key="index"
                    @click="setComponent(item)"
                  >
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <br />

              <v-menu v-if="moreComponents.length" offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    block
                    tile
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>
                      mdi-dots-vertical
                    </v-icon>
                    {{ moreComponents.length }} Components Selected
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in moreComponents"
                    :key="index"
                    @click="setComponent(item)"
                  >
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <br />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-divider class="my-6" />
      </div>

      <div id="addComponentPanel">
        <tweak-add-component
          :compact="compact"
          :items="Object.values(componentConfigs)"
          @save-click="onSaveClick"
        ></tweak-add-component>
      </div>

      <v-divider class="my-6" />
    </div>

    <div
      style="flex: 1 1 auto;"
      :class="{ 'overflow-y-auto': scrollable }"
      class="fill-height px-2"
    >
      <h3 class="text-subtitle-1 text-center">{{ config.displayName }}</h3>

      <br />

      <v-container class="px-0">
        <v-row>
          <v-expansion-panels flat v-model="panel1">
            <v-expansion-panel>
              <v-expansion-panel-header class="pa-0 px-2">
                Spaces
              </v-expansion-panel-header>
              <v-expansion-panel-content id="spacesPanel" class="px-0">
                <tweak-prop
                  v-for="(prop, i) in alignProps"
                  :key="i"
                  v-bind="prop"
                  :options="prop.options"
                  @property-change="onValueChange"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <tweak-prop
            v-for="(prop, i) in props"
            :key="i"
            v-bind="prop"
            :options="prop.options"
            @property-change="onValueChange"
          />
        </v-row>
      </v-container>
    </div>
    <v-tour
      name="properties"
      :steps="steps"
      :callbacks="tourCallbacks"
    ></v-tour>
  </div>
</template>

<script>
import componentConfigs from "../../config/index";
import { mapState, mapActions } from "vuex";
import { EventBus, eventsInternal } from "../../utils/eventBus";
import { createSlot } from "../../utils/helpers";

export default {
  name: "HomeSettings",

  props: {
    scrollable: {
      type: Boolean,
      default: false
    }
  },

  inject: ["compact"],

  provide() {
    return {
      config: { editable: false }
    };
  },

  data() {
    return {
      panel:
        localStorage.getItem("pagesandbox_tour_skipped") === "true" ? null : 0,
      panel1:
        localStorage.getItem("pagesandbox_tour_skipped") === "true" ? null : 0,
      componentConfigs,
      selectedComponentsBefore: [],
      colors: [this.$vuetify.theme.currentTheme.primary, "#9368e9", "#F4511E"],
      steps: [
        {
          target: "#colors", // We're using document.querySelector() under the hood
          content: `Change the primary color of the application.`
        },

        {
          target: "#addComponentPanel", // We're using document.querySelector() under the hood
          content: `Toggle this panel to add new child components to the selected one.`
        },
        {
          target: "#spacesPanel", // We're using document.querySelector() under the hood
          content: `Change the space around the selected components.`
        }
      ],
      tourCallbacks: {
        onFinish: () =>
          EventBus.$emit(eventsInternal.TOUR_FINISHED, "properties"),
        onSkip: () => EventBus.$emit(eventsInternal.TOUR_SKIPPED)
      }
    };
  },

  created() {
    EventBus.$on("on-keydown", this.onKeyUp.bind(this));
  },

  mounted() {
    const skipped = localStorage.getItem("pagesandbox_tour_skipped") === "true";

    if (!skipped) {
      this.$tours["properties"].start();
    }
  },

  computed: {
    ...mapState("settings", [
      "allowEdit",
      "open",
      "componentName",
      "history",
      "moreComponents"
    ]),

    id() {
      return this.$store.state.settings.id || "app";
    },

    componentData() {
      return this.getData();
    },

    config() {
      return (
        this.componentConfigs[this.componentName] ||
        this.componentConfigs.BaseApp
      );
    },

    props() {
      const props = this.config.props || [];
      const componentData = this.componentData;

      return props.map(config => {
        config.value = componentData[config.propName];
        return config;
      });
    },

    alignProps() {
      const props = this.config.alignProps || [];
      const componentData = this.componentData;

      return props.map(config => {
        config.value = componentData[config.propName];
        return config;
      });
    },

    engineDark: {
      get() {
        return this.$store.state.engine.data.app.dark;
      },
      set(value) {
        this.dispatch("setProp", {
          id: "app",
          key: "dark",
          value
        });
      }
    },

    currentThemePrimary: {
      get() {
        return this.$store.state.engine.data.app.primary;
      },
      set(value) {
        this.dispatch("setProp", {
          id: "app",
          key: "primary",
          value
        });
      }
    }
  },

  methods: {
    ...mapActions("settings", ["setComponent", "setAllowEdit"]),

    ...mapActions("engine", ["setEngineDark", "setEngineColor", "addSlot"]),

    async onSaveClick(data) {
      const payload = createSlot({
        componentName: data.component,
        parentId: this.id
      });

      const slot = await this.dispatch("addSlot", payload);
      this.setComponent({ id: slot.id, name: slot.componentName });
    },

    getData() {
      let data = this.$store.state.engine.data;

      return data[this.id];
    },

    onValueChange({ key, value, apendix = "", id } = {}) {
      // changing the value of entry
      this.dispatch("setProp", {
        id: this.id,
        key,
        value
      });
    },

    dispatch(actionName, payload) {
      return this.$store.dispatch(`engine/${actionName}`, payload);
    },

    onAppSettinsClick() {
      // reset all so application (BaseApp) is set for editing
      this.setComponent({ id: "app", name: "BaseApp" });
    },

    onKeyUp(e) {
      if (e.keyCode === 69 && e.ctrlKey && e.altKey) {
        this.setAllowEdit(!this.allowEdit);
      }
    }
  }
};
</script>

<style>
.prevent-user-select {
  user-select: none;
}
.v-expansion-panel-content > .v-expansion-panel-content__wrap {
  padding: 0 !important;
}
</style>

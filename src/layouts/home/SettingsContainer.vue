<template>
  <div style="display: flex; flex-flow: column;" class="fill-height">
    <div class="px-2" style="flex: 0 1 auto;">
      <v-btn color="primary" block dark @click="onAppSettinsClick">
        <v-icon left>
          mdi-tools
        </v-icon>
        Application Settings
      </v-btn>

      <v-divider class="my-6" />
      <div>
        <h3 align="center" title="Theme Colors" space="0" />

        <tweak-color v-model="currentThemePrimary" />

        <v-divider class="my-6" />

        <v-switch
          v-model="allowEditModel"
          class="mr-4"
          label="Edit Mode (Hold 'E' for quick edit)"
        ></v-switch>

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

        <v-divider class="my-6" />
      </div>

      <tweak-add-component
        :items="Object.keys(componentConfigs)"
        @save-click="onSaveClick"
      ></tweak-add-component>

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

      <v-divider class="my-6" />
    </div>

    <div
      style="flex: 1 1 auto;"
      :class="{ 'overflow-y-auto': scrollable }"
      class="fill-height px-2"
    >
      <h3 class="text-subtitle-1 text-center">{{ config.displayName }}</h3>

      <v-container class="pa-0">
        <v-row>
          <tweak-prop
            v-for="(prop, i) in primitiveProps"
            :key="i"
            v-bind="prop"
            :options="prop.options"
            @property-change="onValueChange"
          />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import componentConfigs from "../../config";
import { mapState, mapActions } from "vuex";
import { EventBus, events } from "../../utils/eventBus";

export default {
  name: "HomeSettings",

  props: {
    scrollable: {
      type: Boolean,
      default: false
    }
  },

  provide() {
    return {
      config: { editable: false }
    };
  },

  data() {
    return {
      componentConfigs,
      selectedComponentsBefore: [],
      colors: [this.$vuetify.theme.currentTheme.primary, "#9368e9", "#F4511E"]
    };
  },

  created() {
    EventBus.$on("on-keydown", this.onKeyDown.bind(this));
    EventBus.$on("on-keyup", this.onKeyUp.bind(this));
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

    allowEditModel: {
      get() {
        return this.allowEdit;
      },
      set(value) {
        this.setAllowEdit(value);
      }
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

    primitiveProps() {
      return this.props.filter(prop => prop.type !== "array");
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

    onSaveClick(data) {
      const slots = this.componentData.slots || {};
      const filtredByType = Object.values(slots)
        .filter(s => s.componentName === data.component)
        .sort()
        .reverse();

      let index = 0;

      if (filtredByType.length) {
        index = ++filtredByType[0].index;
      }

      const key = `${data.component}_${index}`;

      const payload = {
        id: this.id,
        key,
        value: {
          componentName: data.component,
          id: `${this.id}-${key}`,
          index
        }
      };

      this.addSlot(payload);
      this.dispatch("addSlot", payload);
    },

    getData() {
      let data = this.$store.state.engine.data.app;
      let id = this.id || "app";

      const paths = id.split("-").slice(1);

      paths.forEach(path => {
        data = data.slots[path];
      });

      return data || {};
    },

    onValueChange({ key, value, apendix = "", id } = {}) {
      // changing the value of entry
      this.dispatch("setProp", {
        id: `${id || this.id}${apendix}`,
        key,
        value
      });
    },

    dispatch(actionName, { ...payload } = {}) {
      this.$action(`config/${actionName}`, payload);
    },

    onAppSettinsClick() {
      // reset all so application (BaseApp) is set for editing
      this.setComponent({ id: "", name: "" });
    },

    onKeyDown(e) {
      if (!this.allowEdit && e.keyCode === 69) {
        this.setAllowEdit(true);
      }
    },

    onKeyUp(e) {
      if (this.allowEdit && e.keyCode === 69) {
        this.setAllowEdit(false);
      }
    }
  }
};
</script>

<style>
.prevent-user-select {
  user-select: none;
}
</style>

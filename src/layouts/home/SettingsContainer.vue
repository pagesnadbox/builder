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

      <v-menu v-if="aggregations" offset-y>
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
            {{ Object.keys(aggregations).length }} Aggregated Components
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in Object.values(aggregations)"
            :key="index"
            @click="setComponent({ ...item, name: item.componentName })"
          >
            <v-list-item-title>{{ item.componentName }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-divider class="my-6" />
    </div>

    <div
      style="flex: 1 1 auto;"
      :class="{ 'overflow-y-auto': scrollable }"
      class="fill-height "
    >
      <h3 align="center" :title="config.displayName" space="0" />

      <tweak-items
        v-if="items.length"
        :listId="list.id"
        :region="region || undefined"
        :items="items"
        @item-click="onItemClick"
        @property-change="onValueChange"
        @add-click="onAddClick"
        @remove-click="onRemoveClick"
      />

      <v-container>
        <v-row no-gutters class="pa-2">
          <tweak-prop
            v-for="(prop, i) in primitiveProps"
            :key="i"
            v-bind="prop"
            @property-change="onValueChange"
          />
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import config from "../../config";
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
      "id",
      "open",
      "componentName",
      "history",
      "moreComponents"
    ]),

    ...mapState("engine", ["vuetify"]),

    allowEditModel: {
      get() {
        return this.allowEdit;
      },
      set(value) {
        this.setAllowEdit(value);
      }
    },

    isList() {
      return this.config.type === "list";
    },

    list() {
      return this.getData("list");
    },

    aggregations() {
      const data = this.getData();
      let aggregations = data.aggregations;

      if (Array.isArray(aggregations)) {
        aggregations = aggregations.map(a => data[a]);
      }

      return aggregations;
    },

    items() {
      return this.list?.items || [];
    },

    region() {
      // third level nesting (index -> for array like data)
      return this.id.split("-")[0] || "app";
    },

    componentData() {
      return this.getData();
    },

    config() {
      return config[this.componentName] || config.BaseApp;
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
        return this.$store.state.engine.config.app.data.dark;
      },
      set(value) {
        this.dispatch("setProp", {
          region: "app",
          id: "app",
          key: "dark",
          value
        });
      }
    },

    currentThemePrimary: {
      get() {
        return this.$store.state.engine.config.app.data.primary;
      },
      set(value) {
        this.dispatch("setProp", {
          region: "app",
          id: "app",
          key: "primary",
          value
        });
      }
    }
  },

  methods: {
    ...mapActions("settings", ["setComponent", "setAllowEdit"]),
    ...mapActions("engine", ["setEngineDark", "setEngineColor"]),

    getData(prop) {
      let data = this.$store.state.engine.config;
      let id = this.id || "app-list";

      const paths = id.split("-");

      paths.splice(1, 0, "data");

      for (let path of paths) {
        data = data[path];
        if (prop === path) break;
        else if (data === undefined) break;
      }

      return data || {};
    },

    onItemClick(index) {
      let id = `${this.items[index].id}-${index}`;
      const name = this.items[index].componentName;

      this.setComponent({ id, name });
    },

    onAddClick() {
      this.dispatch("addItem");
    },

    onRemoveClick(index) {
      this.dispatch("removeItem", index);
    },

    onValueChange({ key, value, apendix = "", id } = {}) {
      // changing the value of entry

      this.dispatch("setProp", {
        id: `${id || this.id}${apendix}`,
        key,
        value
      });
    },

    dispatch(actionName, { region = this.region, ...payload } = {}) {
      // this.$store.dispatch(`${this.region}/${actionName}`, payload);
      this.$action(`${region}/${actionName}`, payload);
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

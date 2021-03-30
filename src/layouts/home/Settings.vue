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
        <base-btn color="primary" block dark @click="onAppSettinsClick">
          <v-icon left>
            mdi-tools
          </v-icon>
          Application Settings
        </base-btn>

        <v-divider class="my-6" />
        <div v-if="!this.id">
          <base-title align="center" title="Theme Colors" space="0" />

          <tweak-color v-model="currentThemePrimary" />

          <v-divider class="my-6" />

          <v-switch
            v-model="allowEditModel"
            class="mr-4"
            label="Edit Mode (Hold 'E' for quick edit)"
            :outlined="$vuetify.theme.dark"
            @click="$vuetify.theme.dark = false"
          />

          <base-btn
            class="mr-4"
            color="primary"
            :outlined="$vuetify.theme.dark"
            @click="$vuetify.theme.dark = false"
          >
            <v-icon left>
              mdi-white-balance-sunny
            </v-icon>
            Light
          </base-btn>

          <base-btn
            color="primary"
            :outlined="!$vuetify.theme.dark"
            @click="$vuetify.theme.dark = true"
          >
            <v-icon left>
              mdi-weather-night
            </v-icon>
            Dark
          </base-btn>

          <v-divider class="my-6" />
        </div>

        <v-menu v-if="moreComponents.length" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              block
              tile
              :outlined="!$vuetify.theme.dark"
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

        <v-divider class="my-6" />

        <div>
          <base-title align="center" :title="config.displayName" space="0" />

          <tweak-items
            v-if="isList"
            :region="region || undefined"
            :items="items"
            @item-click="onItemClick"
            @property-change="onValueChange"
            @add-click="onAddClick"
            @remove-click="onRemoveClick"
          />

          <div v-for="(prop, i) in primitiveProps" :key="i">
            <tweak-prop v-bind="prop" @property-change="onValueChange" />
          </div>
        </div>
      </v-card-text>
    </component>
  </div>
</template>

<script>
import config from "../../config";
import { mapState, mapActions } from "vuex";

import SettingsModal from "@/components/tweak/SettingsModal";
import SettingsBottomSheet from "@/components/tweak/SettingsBottomSheet";
import { EventBus } from "../../utils/eventBus";

export default {
  name: "HomeSettings",

  components: {
    SettingsModal,
    SettingsBottomSheet
  },

  provide() {
    return {
      config: { editable: false }
    };
  },

  data() {
    return {
      colors: [this.$vuetify.theme.currentTheme.primary, "#9368e9", "#F4511E"]
    };
  },

  created() {
    EventBus.$on("on-keydown", this.onKeyDown.bind(this));
    EventBus.$on("on-keyup", this.onKeyUp.bind(this));

    window.addEventListener("keydown", e => EventBus.$emit("on-keydown", e));
    window.addEventListener("keyup", e => EventBus.$emit("on-keyup", e));

    window.addEventListener("mousemove", e =>
      EventBus.$emit("on-mousemove", e)
    );
    window.addEventListener("mouseup", e => EventBus.$emit("on-mouseup", e));

    window.addEventListener("touchmove", e =>
      EventBus.$emit("on-mousemove", e)
    );
    window.addEventListener("touchend", e => EventBus.$emit("on-mouseup", e));
  },

  watch: {
    id() {
      console.error(this.$refs.scrollableContainer);
      this.$refs.scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  computed: {
    ...mapState("app", ["data"]),
    ...mapState("settings", [
      "allowEdit",
      "id",
      "open",
      "componentName",
      "moreComponents"
    ]),

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

    items() {
      return this.$store.getters[`${this.region}/items`] || [];
    },

    settingsComponent() {
      return this.isDesktop ? SettingsModal : SettingsBottomSheet;
    },

    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    region() {
      // third level nesting (index -> for array like data)
      return this.id.split("-")[0] || "app";
    },

    componentKey() {
      // first level nesting
      return this.id.split("-")[1];
    },

    componentNextKey() {
      // second level nesting
      return this.id.split("-")[2];
    },

    componentIndex() {
      // third level nesting (index -> for array like data)
      const idParts = this.id.split("-");

      return Number(idParts[idParts.length - 1]);
    },

    componentData() {
      let data = this.$store.state[this.region]?.data;

      if (this.componentKey) {
        data = data[this.componentKey];
      }

      if (Array.isArray(data) || this.componentNextKey) {
        if (this.componentNextKey) {
          data = data[this.componentNextKey];
        }
        if (
          this.componentIndex !== undefined &&
          !Number.isNaN(this.componentIndex)
        ) {
          data = data[this.componentIndex];
        }
      }

      return data;
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

    menu: {
      get() {
        return this.open;
      },
      set(val) {
        this.setOpen(val);
      }
    },

    currentThemePrimary: {
      get() {
        return this.$vuetify.theme.currentTheme.primary;
      },
      set(val) {
        const target = this.$vuetify.theme.isDark ? "dark" : "light";

        this.$vuetify.theme.themes[target].primary = val;
      }
    }
  },

  methods: {
    ...mapActions("settings", [
      "setOpen",
      "setComponentId",
      "setComponentName",
      "setAllowEdit"
    ]),

    ...mapActions("components", ["setItems"]),

    onItemClick(index) {
      let id = `${this.items[index].id}-${index}`;

      if (this.region !== "app") {
        // TODO: for now list->items of app data are not
        // suffixed with index, for future if there is logic to create new sections
        // this should be changed
        id = `${id}-${index}`;
      }

      const name = this.items[index].componentName;

      this.setComponent({ id, name });
    },

    onAddClick() {
      this.dispatch("addItem");
    },

    onRemoveClick(index) {
      this.dispatch("removeItem", index);
    },

    setComponent({ id, name }) {
      // set component to for editing (from list or from dropdown "N more componentns")
      this.setComponentId(id);
      this.setComponentName(name);
    },

    onValueChange(payload) {
      // changing the value of entry
      // support several levels of nesting
      // 1 level (componentKey) => 2 level (componentNextKey) => 3 level (index - applicable for array like data - "items")
      this.dispatch("setProp", {
        componentKey: this.componentKey,
        componentNextKey: this.componentNextKey,
        index: this.componentIndex,
        ...payload
      });
    },

    dispatch(actionName, payload) {
      this.$store.dispatch(`${this.region}/${actionName}`, payload);
    },

    onAppSettinsClick() {
      // reset all so application (BaseApp) is set for editing
      this.setComponentId("");
      this.setComponentName("");
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

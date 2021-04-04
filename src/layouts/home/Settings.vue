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
          ></v-switch>

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
      !this.isDesktop &&
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

    list() {
      return this.getData("list");
    },

    items() {
      return this.list?.items || [];
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

    getData(prop) {
      let data = this.$store.state;
      let id = this.id || "app-list";

      const paths = id.split("-");

      paths.splice(1, 0, "data");

      for (let path of paths) {
        data = data[path];
        if (prop === path) break;
      }

      return data;
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

    setComponent({ id, name }) {
      // set component to for editing (from list or from dropdown "N more componentns")
      this.setComponentId(id);
      this.setComponentName(name);
    },

    onValueChange({ key, value, apendix = "", id } = {}) {
      // changing the value of entry
      this.dispatch("setProp", {
        id: `${id || this.id}${apendix}`,
        key,
        value
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

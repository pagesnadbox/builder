<template>
  <v-col cols="6" v-if="type === 'boolean'">
    <v-checkbox v-model="checkboxSwitchValue" :label="displayName" />
  </v-col>

  <v-col cols="12" v-else-if="type === 'switch'">
    <v-switch v-model="checkboxSwitchValue" :label="displayName" class="mb-3" />
  </v-col>

  <v-col cols="12" v-else-if="type === 'label'">
    <p>{{ displayName }}</p>
  </v-col>

  <v-col cols="12" v-else-if="type === 'divider'">
    <v-divider class="py-2"></v-divider>
  </v-col>

  <v-col cols="12" v-else-if="type === 'group'">
    <p>{{ displayName }}</p>
    <v-btn-toggle v-model="groupValue" class="mb-3">
      <v-btn v-for="(item, i) in enums" :key="i">
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-col>

  <v-col cols="12" v-else-if="type === 'color'">
    <p>{{ displayName }}</p>

    <tweak-color clearable :value="value" @input="onValueChange" />
  </v-col>

  <v-col cols="12" v-else-if="type === 'icon'">
    <v-text-field
      :label="displayName"
      :value="value"
      outlined
      @input="onValueChange"
    >
      <template v-slot:append-outer>
        <tweak-icon @value-change="onValueChange" />
      </template>
    </v-text-field>
  </v-col>

  <v-col cols="12" v-else-if="type === 'enum'">
    <v-select
      :label="displayName"
      outlined
      :items="enums"
      :value="value"
      @change="onValueChange"
    />
  </v-col>

  <v-col cols="12" v-else-if="type === 'file'">
    <p>{{ displayName }}</p>

    <v-text-field outlined :value="value" @input="onValueChange">
      <template v-slot:append-outer>
        <v-btn x-large depressed color="primary" @click="onGalleryClick">
          Image
        </v-btn>
      </template>
    </v-text-field>
  </v-col>

  <v-col cols="12" v-else>
    <v-text-field
      :label="displayName"
      :value="value"
      outlined
      @input="onValueChange"
    />
  </v-col>
</template>

<script>
import { throttle } from "lodash";
import { mapActions } from "vuex";
import { EventBus } from "../../utils/eventBus";

export default {
  name: "PropTweak",

  props: {
    displayName: {
      type: String,
      default: ""
    },

    propName: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: ""
    },

    enums: {
      type: Array,
      default: () => []
    },

    value: {
      type: [Number, String, Boolean],
      default() {
        if (this.type === "color") {
          return "#00000000";
        } else if (this.type === "boolean") {
          return false;
        } else {
          return "";
        }
      }
    }
  },

  data() {
    return {};
  },

  computed: {
    checkboxSwitchValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("property-change", { key: this.propName, value });
      }
    },

    groupValue: {
      get() {
        return this.enums.findIndex(e => e.value === this.value);
      },
      set(value) {
        this.onValueChange(value);
      }
    }
  },

  methods: {
    ...mapActions("settings", ["setShowGallery", "setImage"]),

    onGalleryClick() {
      EventBus.$on("on-image-click", this.onImageClick.bind(this));

      this.setShowGallery(true);
    },

    onImageClick(payload) {
      const data = {
        name: `assets/${payload.name}`,
        value: {
          url: payload.url,
          file: payload.file
        }
      };

      this.setImage(data);

      this.onValueChange(data.name);
    },

    onValueChange: throttle(function(payload) {
      if (payload !== undefined) {
        let value = payload;

        if (this.type === "group") {
          value = this.enums[payload].value;
        }

        this.$emit("property-change", { key: this.propName, value });
      }
    }, 400)
  }
};
</script>

<style scoped>
>>> .v-input__append-outer {
  margin: 2px;
  margin-left: 5px;
  height: 100%;
}
</style>

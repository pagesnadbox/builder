<template>
  <v-col cols="6" v-if="type === 'boolean'">
    <v-checkbox
      v-model="checkboxValue"
      :indeterminate="value === false && options.indeterminate"
      :label="displayName"
    />
  </v-col>

  <v-col cols="12" v-else-if="type === 'switch'">
    <v-switch v-model="switchValue" :label="displayName" class="mb-3" />
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
import { EventBus, eventsInternal } from "../../utils/eventBus";
import { mapActions } from "vuex";

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

    options: {
      type: Object,
      default: () => ({})
    },

    value: {
      type: [Number, String, Boolean, null],
      default() {
        if (this.type === "color") {
          return "#00000000";
        } else if (this.type === "boolean") {
          if (this.options.indeterminate) return null;
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
    checkboxValue: {
      get() {
        return this.value;
      },

      set(data) {
        let value = data;

        if (this.options.indeterminate) {
          switch (this.value) {
            case true:
              value = false;
              break;
            case false:
              value = null;
              break;
            case null:
              value = true;
              break;
          }
        }

        this.$emit("property-change", { key: this.propName, value });
      }
    },

    switchValue: {
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
    ...mapActions("settings", ["setShowGallery"]),
    onGalleryClick() {
      EventBus.$on(eventsInternal.ON_IMAGE_CLICK, this.onImageClick.bind(this));

      this.setShowGallery(true);
    },

    onImageClick(payload) {
      const data = {
        name: payload.fileName,
        value: {
          url: payload.fileName,
          file: payload.file
        }
      };

      this.$action("settings/setImage", data);

      this.onValueChange(data.name);
    },

    onValueChange(payload) {
      if (payload !== undefined) {
        let value = payload;

        if (this.type === "group") {
          value = this.enums[payload].value;
        }

        this.$emit("property-change", { key: this.propName, value });
      }
    }
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

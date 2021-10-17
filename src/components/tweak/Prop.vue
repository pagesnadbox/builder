<template>
  <v-col cols="6" v-if="type === 'boolean'">
    <v-checkbox
      v-model="checkboxValue"
      :indeterminate="effectiveValue === false && options.indeterminate"
      :label="displayName"
    />
  </v-col>

  <v-col cols="12" v-else-if="type === 'switch'">
    <v-switch v-model="switchValue" :label="displayName" class="mb-3" />
  </v-col>

  <v-col cols="6" v-else-if="type === 'space' && propName.startsWith('margin')">
    <p>Margin</p>

    <v-text-field
      type="number"
      clearable
      :label="displayName"
      :value="effectiveValue"
      outlined
      @input="onValueChange"
    />
  </v-col>

  <v-col
    cols="6"
    v-else-if="type === 'space' && propName.startsWith('padding')"
  >
    <p>Padding</p>

    <v-text-field
      type="number"
      clearable
      :label="displayName"
      :value="effectiveValue"
      outlined
      @input="onValueChange"
    />
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

    <tweak-color clearable :value="effectiveValue" @input="onValueChange" />
  </v-col>

  <v-col cols="12" v-else-if="type === 'icon'">
    <v-text-field
      :label="displayName"
      :value="effectiveValue"
      outlined
      clearable
      @input="onValueChange"
    >
      <template v-slot:append-outer>
        <tweak-icon @value-change="onValueChange" />
      </template>
    </v-text-field>
  </v-col>

  <v-col :cols="tweakSize" v-else-if="type === 'enum'">
    <v-select
      offset-y
      :label="displayName"
      outlined
      :items="enums"
      clearable
      :value="effectiveValue"
      @change="onValueChange"
    />
  </v-col>

  <v-col cols="12" v-else-if="type === 'file'">
    <p>{{ displayName }}</p>

    <v-text-field outlined :value="effectiveValue" @input="onValueChange">
      <template v-slot:append-outer>
        <v-btn x-large depressed color="primary" @click="onGalleryClick">
          Image
        </v-btn>
      </template>
    </v-text-field>
  </v-col>

  <v-col cols="12" v-else-if="type === 'panel'">
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-0 px-2">
          {{ displayName }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <tweak-prop
            v-for="(prop, i) in props"
            v-bind="prop"
            :key="i"
            @property-change="$emit('property-change', $event)"
          ></tweak-prop>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>

  <v-col cols="12" v-else-if="type === 'gradient'">
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-0 px-2">
          {{ displayName }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <p>Direction</p>

          <v-select
            outlined
            :value="gradientValues.dir"
            :items="gradientDirs"
            @change="onGradientDirChange"
          ></v-select>

          <p>Colors</p>

          <div v-for="(color, index) in gradientValues.colors" :key="index">
            <tweak-color
              clearable
              :value="color"
              @input="onGradientColorChange($event, index)"
            />
            <br />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>

  <v-col cols="12" v-else>
    <v-text-field
      clearable
      :label="displayName"
      :value="effectiveValue"
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
      default: "",
    },

    propName: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    tweakSize: {
      type: String,
      default: "12",
    },

    enums: {
      type: Array,
      default: () => [],
    },

    props: {
      type: Array,
      default: () => [],
    },

    options: {
      type: Object,
      default: () => ({}),
    },

    defaultValue: null,

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
      },
    },
  },

  data() {
    return {
      gradientDirs: ["to bottom", "to top", "to left", "to right"],
      colors: [],
      direction: "to bottom",
    };
  },

  computed: {
    gradientValues() {
      const [dir, from, to] = this.effectiveValue.split(", ");

      return { dir, colors: [from, to] };
    },

    effectiveValue() {
      return this.value || this.defaultValue;
    },

    checkboxValue: {
      get() {
        return this.effectiveValue;
      },

      set(data) {
        let value = data;

        if (this.options.indeterminate) {
          switch (this.effectiveValue) {
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
      },
    },

    switchValue: {
      get() {
        return this.effectiveValue;
      },
      set(value) {
        this.$emit("property-change", { key: this.propName, value });
      },
    },

    groupValue: {
      get() {
        return this.enums.findIndex((e) => e.value === this.effectiveValue);
      },
      set(value) {
        this.onValueChange(value);
      },
    },
  },

  methods: {
    ...mapActions("settings", ["setShowGallery", "setImage"]),

    onGradientColorChange(value, index) {
      const data = this.gradientValues;
      this.colors[index] = value;

      this.onValueChange([data.dir, ...this.colors].join(", "));
    },

    onGradientDirChange(value) {
      const data = this.gradientValues;

      this.onValueChange([value, ...data.colors].join(", "));
    },

    onGalleryClick() {
      EventBus.$on(eventsInternal.ON_IMAGE_CLICK, this.onImageClick.bind(this));

      this.setShowGallery(true);
    },

    onImageClick(payload) {
      const data = {
        name: payload.fileName,
        value: {
          url: payload.fileName,
          file: payload.file,
        },
      };

      this.$action("settings/setImage", data);
      this.setImage(data);

      this.onValueChange(data.name);
    },

    onValueChange(payload) {
      if (payload !== undefined) {
        let value = payload;

        if (this.type === "group") {
          value = this.enums[payload].value;
        }

        console.error({ key: this.propName, value });
        this.$emit("property-change", { key: this.propName, value });
      }
    },
  },
};
</script>

<style scoped>
>>> .v-input__append-outer {
  margin: 2px;
  margin-left: 5px;
  height: 100%;
}
>>> .v-expansion-panel-content__wrap {
  padding: 0;
}
</style>

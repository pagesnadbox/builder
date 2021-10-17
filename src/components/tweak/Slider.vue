<template>
  <div>
    <v-sheet width="150">
      <v-select
        v-model="selectedPosition"
        outlined
        label="Margin"
        :items="positions"
      >
      </v-select>
    </v-sheet>
    <v-slider
      :value="effectiveValue"
      @input="onValueChange"
      @change="onValueChangeBind"
      :thumb-size="24"
      thumb-label="always"
    >
    </v-slider>
  </div>
</template>

<script>
import { throttle } from "@/utils/helpers";

export default {
  name: "TweakSlider",
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      selectedPosition: "all",
      positions: ["all", "top", "right", "bottom", "left"],
      values: {
        all: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };
  },

  computed: {
    effectiveValue() {
      return parseInt(this.values[this.selectedPosition]);
    },
  },

  created() {
    this.onValueChange = throttle(this.onValueChangeBind.bind(this), 600);
  },

  watch: {
    value(value) {
      console.error(value);
      const parsed = this.value.split(" ");
      this.positions.slice(1).forEach((p, i) => (this.values[p] = parsed[i]));
    },
  },

  methods: {
    parseValue() {
      return `${this.values.top}px ${this.values.right}px ${this.values.bottom}px ${this.values.left}px`;
    },
    setValues(value) {
      if (this.selectedPosition === "all") {
        this.positions.forEach((p) => (this.values[p] = value));
      } else {
        this.values[this.selectedPosition] = value;
      }
    },
    onValueChangeBind(value) {
      this.setValues(value);
      const parsed = this.parseValue(value);

      console.error(parsed);
      this.$emit("input", `${parsed}`);
    },
  },
};
</script>

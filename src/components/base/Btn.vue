<template>
  <v-btn
    :color="color"
    :depressed="depressed"
    :min-width="minWidth"
    :tile="tile"
    :text="textOnly"
    class="font-weight-bold"
    v-bind="{ ...attrs, ...sizeObject }"
    :href="href"
    :target="targetFormatted"
    :block="block || blockOnMobile"
    v-on="listeners"
  >
    <slot />

    <v-icon v-if="iconSrc" right>
      {{ iconSrc }}
    </v-icon>
  </v-btn>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "BaseBtn",

  mixins: [mixin],

  props: {
    href: {
      type: String,
      default: ""
    },

    iconSrc: {
      type: String,
      default: ""
    },

    color: {
      type: String,
      default: "#42A5F6"
    },

    depressed: {
      type: Boolean,
      default: false
    },

    textOnly: {
      type: Boolean,
      default: false
    },

    openInNewTab: {
      type: Boolean,
      default: false
    },

    minWidth: {
      type: [Number, String],
      default: 64
    },

    block: {
      type: Boolean,
      default: false
    },

    blockOnMobile: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: ""
    },

    tile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeObject() {
      return {
        "x-small": this.size === "x-small",
        small: this.size === "small",
        normal: this.size === "normal",
        large: this.size === "large",
        "x-large": this.size === "x-large"
      };
    },

    targetFormatted() {
      return this.openInNewTab ? "_blank" : "_self";
    }
  }
};
</script>

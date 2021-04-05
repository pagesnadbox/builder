<template>
  <p class="pa-1" v-on="listeners" v-bind="attrs">
    {{ text }}
  </p>
</template>
<script>
import mixin from "./mixin";

export default {
  name: "BaseText",

  mixins: [mixin],

  props: {
    text: {
      type: String,
      default: ""
    },

    fontSize: {
      type: String,
      default: "1rem"
    },

    fontWeight: {
      type: String,
      default: "1rem"
    },
  }
};
</script>

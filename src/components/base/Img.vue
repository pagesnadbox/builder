<template>
  <img v-bind="attrs" :height="effectiveHeight" :src="source" v-on="listeners" />
</template>

<script>
import mixin from "./imgMixin";

export default {
  name: "BaseImg",

  mixins: [mixin],
};
</script>

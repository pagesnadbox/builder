<template>
  <v-img v-bind="attrs" :height="effectiveHeight" :src="source" v-on="listeners">
    <slot />
  </v-img>
</template>

<script>
import mixin from "./imgMixin";

export default {
  name: "BaseVuetifyImg",

  mixins: [mixin],
};
</script>

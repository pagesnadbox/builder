<template>
  <div :style="wrapperStyles">
    <v-text-field
      :readonly="allowEdit"
      hide-details
      v-on="listeners"
      v-bind="attrs"
      :light="!attrs.dark"
    ></v-text-field>
  </div>
</template>

<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],

  props: {
    minWidth: {
      type: String,
      defeult: ""
    }
  },

  computed: {
    wrapperStyles() {
      const styles = {};

      if (this.isDesktop) {
        styles.minWidth = `${this.minWidth}px`;
      }

      return styles;
    }
  }
};
</script>

<style scoped>
>>> .v-input__slot {
  min-height: 52px !important;
}
</style>

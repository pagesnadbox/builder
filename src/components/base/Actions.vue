<template>
  <div v-on="listeners" v-bind="attrs">

    <base-link v-if="data.link && !data.link.hidden && data.linkAction" v-bind="data.link" />

    <base-btn
      class="ma-2"
      v-if="!data.main.hidden && data.mainAction"
      v-bind="main"
    >
      {{ data.main.text }}
    </base-btn>

    <span
      v-if="
        hasOr &&
          !data.secondary.hidden &&
          data.secondaryAction &&
          data.mainAction
      "
      class="font-weight-bold ml-6 mr-4 my-4"
      >or</span
    >

    <base-btn
      class="ma-2"
      v-if="!data.secondary.hidden && data.secondaryAction"
      :ripple="false"
      v-bind="secondary"
    >
      {{ data.secondary.text }}
    </base-btn>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "BaseActions",

  mixins: [mixin],

  props: {
    data: {
      type: Object,
      default: () => ({})
    },

    hasOr: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      const classes = "pa-2 d-inline-flex flex-wrap align-center".split(" ");

      if (this.data.horizontal) {
        classes.push("flex-row");
      } else {
        classes.push("flex-column");
      }

      return classes;
    },

    main() {
      const { text, ...data } = this.data.main;
      return data;
    },

    secondary() {
      const { text, ...data } = this.data.secondary;
      return data;
    }
  }
};
</script>

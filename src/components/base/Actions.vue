<template>
  <div v-on="listeners" v-bind="attrs">
    <base-link v-if="!link.hidden && linkAction" v-bind="link" />

    <base-btn
      class="ma-2"
      v-if="!mainData.hidden && mainAction"
      v-bind="mainData"
      :id="`${$attrs.id}-${mainData.id}`"
    >
      {{ main.text }}
    </base-btn>

    <base-btn
      class="ma-2"
      v-if="!secondaryData.hidden && secondaryAction"
      :ripple="false"
      v-bind="secondaryData"
      :id="`${$attrs.id}-${secondaryData.id}`"
    >
      {{ secondary.text }}
    </base-btn>

    <base-email-form
      v-if="!emailForm.hidden && emailFormActions"
      :id="`${$attrs.id}-${emailForm.id}`"
      v-bind="emailForm"
    ></base-email-form>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "BaseActions",

  mixins: [mixin],

  props: {
    hasOr: {
      type: Boolean,
      default: false
    },

    horizontal: {
      type: Boolean,
      default: false
    },

    linkAction: {
      type: Boolean,
      default: false
    },

    emailFormActions: {
      type: Boolean,
      default: false
    },

    mainAction: {
      type: Boolean,
      default: false
    },

    secondaryAction: {
      type: Boolean,
      default: false
    },

    link: {
      type: Object,
      default: () => ({})
    },

    main: {
      type: Object,
      default: () => ({})
    },

    secondary: {
      type: Object,
      default: () => ({})
    },

    emailForm: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    classes() {
      const classes = "d-inline-flex flex-wrap align-center".split(" ");

      if (this.horizontal) {
        classes.push("flex-row");
      } else {
        classes.push("flex-column");
      }

      return classes;
    },

    mainData() {
      const { text, ...data } = this.main;
      return data;
    },

    secondaryData() {
      const { text, ...data } = this.secondary;
      return data;
    }
  }
};
</script>

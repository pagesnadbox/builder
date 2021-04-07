<template>
  <form :action="action" :method="method" class="pa-0">
    <v-container class="pa-0" v-on="listeners" v-bind="attrs" :id="attrs.id">
      <v-row>
        <v-col :cols="cols">
          <base-input
            full-width
            v-bind="input"
            :id="`${$attrs.id}-${input.id}`"
          ></base-input>
        </v-col>
        <v-col :cols="cols">
          <base-btn
            v-bind="submitBtnData"
            type="submit"
            :id="`${$attrs.id}-${submitBtnData.id}`"
          >
            {{ submit.text }}
          </base-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],

  props: {
    action: {
      type: String,
      default: ""
    },

    emailName: {
      type: String,
      default: ""
    },

    method: {
      type: String,
      default: ""
    },

    submit: {
      type: Object,
      default: () => ({})
    },

    input: {
      type: Object,
      default: () => ({})
    },

  },

  computed: {
    submitBtnData() {
      const { text, ...data } = this.submit;
      return data;
    },

    cols() {
      return this.isMobile ? '12' : undefined
    }
  }
};
</script>

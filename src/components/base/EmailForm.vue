<template>
  <form :action="action" :method="method" class="pa-0">
    <v-container class="pa-1" v-on="listeners" v-bind="attrs" :id="attrs.id">
      <v-row>
        <v-col :cols="12 / cols" :md="12 / md">
          <base-input
            full-width
            v-bind="input"
            :id="`${$attrs.id}-${input.id}`"
          ></base-input>
        </v-col>
        <v-col :cols="12 / cols" :md="12 / md">
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

    cols: {
      type: String,
      default: "1"
    },

    md: {
      type: String,
      default: "2"
    }
  },

  computed: {
    submitBtnData() {
      const { text, ...data } = this.submit;
      return data;
    }
  }
};
</script>

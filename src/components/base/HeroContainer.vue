<template>
  <v-responsive
    class="base-divider"
    v-bind="attrs"
    :max-width="maxWidth"
    :style="styles"
    v-on="listeners"
  >
    <v-container>
      <v-row>
        <v-col
          v-for="(aggregationName, i) in filteredAggregations"
          :cols="12"
          :md="12"
          :key="i"
        >
          <component
            :is="data[aggregationName].tagName"
            :align="data[aggregationName].align || align"
            v-bind="data[aggregationName]"
          ></component>
        </v-col>
      </v-row>
    </v-container>
  </v-responsive>
</template>

<script>
// Mixins
import mixin from "./mixin";
import Heading from "@/mixins/heading";

export default {
  name: "BaseHeroContainer",

  mixins: [Heading, mixin],

  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    color: String,
    space: {
      type: [Number, String],
      default: 6
    },
    align: String,
    maxWidth: String,
    cols: {
      type: String,
      default: "12"
    },
    md: {
      type: String,
      default: "6"
    },
    aggregations: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    filteredAggregations() {
      return this.aggregations.filter(a => !this.data[a].hidden && a !== "img");
    },

    classes() {
      return [
        this.color,
        this.margin,
        `mb-${this.space}`,
        this.dense && "base-divider--dense"
      ];
    },

    margin() {
      switch (this.align) {
        case "left":
          return "mr-auto";
        case "right":
          return "ml-auto";
        default:
          return "mx-auto";
      }
    }
  }
};
</script>

<style lang="sass">
.base-divider .v-divider
  border-width: 3px 0 0 0 !important

  .base-divider.base-divider--dense .v-divider
    border-width: 2px 0 0 0 !important
</style>

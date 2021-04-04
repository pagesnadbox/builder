<template>
  <v-responsive
    class="base-divider"
    v-bind="attrs"
    :max-width="maxWidth"
    :style="styles"
    v-on="listeners"
  >
    <base-list v-bind="listData.data">
      <template v-slot:item="{ cols, md }">
        <v-col
          v-for="(data, i) in listData.items.filter(i => !i.hidden)"
          :cols="cols"
          :md="md"
          :key="i"
        >
          <component
            :id="`${listData.data.id}-items-${i}`"
            :is="data.tagName"
            :align="data.align || align"
            v-bind="data"
          ></component>
        </v-col>
      </template>
    </base-list>
  </v-responsive>
</template>

<script>
// Mixins
import mixin from "./mixin";
import Heading from "@/mixins/heading";

export default {
  name: "BaseResizeContainer",

  mixins: [Heading, mixin],

  props: {
    color: String,
    space: {
      type: [Number, String],
      default: 6
    },
    align: String,
    maxWidth: String,
    items: {
      type: Array,
      default: () => []
    },
    cols: {
      type: String,
      default: "12"
    },
    md: {
      type: String,
      default: "6"
    },
    list: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    listData() {
      const { items, ...data } = this.list;
      return { items, data };
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

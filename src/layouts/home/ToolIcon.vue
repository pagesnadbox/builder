<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="{ ...attrs, ...$attrs }" v-on="{ ...on, ...$listeners }">
        <slot></slot>
      </v-icon>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    tooltip: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>

<template>
  <base-hero id="hero" :data="data"></base-hero>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("hero", ["data"])
  }
};
</script>

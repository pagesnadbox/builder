<template>
  <v-snackbar
    :color="color"
    :bottom="bottom"
    :top="top"
    :left="left"
    :right="right"
    v-model="snackbarModel"
    dark
  >
    <v-row>
      <v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
      <span>{{ message }}</span>
      <v-spacer></v-spacer>
      <v-icon size="16" @click="setSnackbar(false)">mdi-close-circle</v-icon>
    </v-row>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("snackbar", [
      "snackbar",
      "top",
      "left",
      "bottom",
      "right",
      "color",
      "message",
    ]),
    snackbarModel: {
      get() {
        return this.snackbar;
      },
      set(val) {
        this.setSnackbar(val);
      },
    },
  },
  methods: {
    ...mapActions("snackbar", ["setSnackbar"]),
  },
};
</script>

<style scoped lang="stylus"></style>

<template>
  <v-container>
    <v-row no-gutters class="fill-height">
      <v-col cols="6" class="pr-3">
        <Tree />
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="6" class="px-1 fill-height">
        <v-sheet height="100%" class="fill-height pa-2 overflow-hidden">
          <SettingsContainer :scrollable="true" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SettingsContainer from "@/layouts/home/SettingsContainer";
import Tree from "./Tree";

export default {
  components: {
    SettingsContainer,
    Tree
  }
};
</script>

<style></style>

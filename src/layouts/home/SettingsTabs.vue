<template>
  <div class="fill-height overflow-auto">
    <v-tabs class="px-4 pb-1" fixed-tabs v-model="tab">
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab :key="0">Properties</v-tab>
      <v-tab :key="1">Tree</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="0">
        <v-card flat>
          <v-card-text>
            <SettingsContainer />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :key="1">
        <v-card flat>
          <v-card-text>
            <Tree @item-clicked="tab = 0" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import SettingsContainer from "@/layouts/home/SettingsContainer";
import Tree from "./Tree";

export default {
  components: {
    SettingsContainer,
    Tree,
  },

  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style></style>

<template>
  <v-container fluid>
    <v-row class="justify-start">
      <v-col class="flex-grow-0">
        <v-card @click="onCrateClick" width="400" class="fill-height">
          <v-container class="fill-height">
            <v-row align="center" justify="center" class="fill-height">
              <v-icon size="36">mdi-plus</v-icon>
              <div>Create New</div>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col v-for="(template, id) in items" :key="id" class="flex-grow-0">
        <base-template-card
          :to="`/templates/${id}`"
          @click="onCrateClick"
          v-bind="template"
        ></base-template-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.fetchItems();
  },

  computed: {
    ...mapState("templates", ["items"])
  },

  methods: {
    ...mapActions("templates", ["fetchItems"]),
    onCrateClick() {}
  }
};
</script>

<style scoped></style>

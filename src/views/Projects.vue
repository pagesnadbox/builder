<template>
  <v-container>
    <v-row class="justify-start">
      <v-col class="flex-grow-0">
        <v-card
          outlined
          @click="onCrateClick"
          width="400"
          height="356"
          class="fill-height"
        >
          <v-container class="fill-height">
            <v-row align="center" justify="center" class="fill-height">
              <v-icon size="36">mdi-plus</v-icon>
              <div>Create New</div>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        v-for="(project, id, index) in filteredProjects"
        :key="id"
        class="flex-grow-0"
      >
        <base-project-card
          width="400"
          outlined
          @click="onTemplateClick(id)"
          :image="`/assets/article-${index + 1}.jpg`"
          v-bind="project"
          @remove-click="onRemoveClick(project)"
          @edit-click="onEditClick(project)"
        ></base-project-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.fetchItems();
  },

  computed: {
    ...mapGetters("projects", ["filteredProjects"])
  },

  methods: {
    ...mapActions("projects", ["fetchItems", "remove"]),

    ...mapActions("editableDialog", ["setEditMode", "setVisible", "setData"]),

    onCrateClick() {
      this.setData(null);
      this.setEditMode(false);
      this.setVisible(true);
    },

    onEditClick(project) {

    },

    onRemoveClick(project) {
      this.remove({ id: project.id });
    },

    onTemplateClick(id) {
      this.$router.push({ path: `/projects/${id}` });
    }
  }
};
</script>

<style scoped></style>

<template>
  <v-container>
    <v-row class="justify-start">
      <v-col class="flex-grow-0">
        <v-card
          outlined
          @click="onCrateClick"
          width="400"
          min-height="356"
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
          min-height="356"
          class="fill-height"
          outlined
          :image="`/assets/article-${index + 1}.jpg`"
          v-bind="project"
          @click="onTemplateClick(project)"
          @remove-click="onRemoveClick(project)"
          @edit-click="onEditClick(project)"
          :loading="loading"
        ></base-project-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { EventBus, events } from '../utils/eventBus';
export default {
  data() {
    return {
      loading: false
    };
  },

  created() {
    this.fetchItems();
  },

  computed: {
    ...mapGetters("projects", ["filteredProjects"])
  },

  methods: {
    ...mapActions("projects", ["fetchItems", "remove", "setCurrent"]),

    ...mapActions("editableDialog", ["setEditMode", "setVisible", "setData"]),

    ...mapActions("modals", ["setModalData"]),

    onCrateClick() {
      this.setData(null);
      this.setEditMode(false);
      this.setVisible(true);
    },

    onEditClick(project) {
      this.setData(project);
      this.setEditMode(true);
      this.setVisible(true);
    },

    onRemoveClick(project) {
      this.setModalData({
        key: "confirm",
        value: {
          visibility: true,
          action: "remove this project",
          callback: () => this.onRemoveConfirmed(project.id)
        }
      });
    },

    async onRemoveConfirmed(id) {
      this.loading = true;
      await this.remove({ id });
      this.loading = false;
    },

    onTemplateClick(project) {
      this.setCurrent(project);

      this.$router.push({ path: `/projects/${project.id}` });
    }
  }
};
</script>

<style scoped></style>

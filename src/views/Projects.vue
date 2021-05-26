<template>
  <v-container>
    <v-row class="justify-start">
      <v-col class="flex-grow-0" v-if="!project">
        <v-card
          id="createNewCard"
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
      <v-col v-else class="flex-grow-0">
        <base-project-card
          id="project"
          width="400"
          min-height="356"
          class="fill-height"
          outlined
          :image="`/assets/article-1.jpg`"
          v-bind="project"
          @click="onTemplateClick(project)"
          @remove-click="onRemoveClick(project)"
          @edit-click="onEditClick(project)"
          :loading="loading"
        ></base-project-card>
      </v-col>
    </v-row>
    <v-tour name="project" :steps="steps" :callbacks="tourCallbacks"></v-tour>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      loading: false,
      steps: [
        {
          target: "#createNewCard", // We're using document.querySelector() under the hood
          header: {
            title: "Get Started"
          },
          content: `Create or edit project from templates.`
        }
      ],
      tourCallbacks: {
        onSkip: this.onTourSkip.bind(this),
      }
    };
  },

  created() {
    this.fetchProject();
  },

  mounted() {
    const skipped = localStorage.getItem("pagesandbox_tour_skipped") === "true";
    if (!skipped) {
      this.$tours["project"].start();
    }
  },

  computed: {
    ...mapState("projects", ["project"])
  },

  methods: {
    ...mapActions("projects", ["fetchProject", "remove"]),

    ...mapActions("editableDialog", ["setEditMode", "setVisible", "setData"]),

    ...mapActions("modals", ["setModalData"]),

    onTourSkip() {
      localStorage.setItem("pagesandbox_project_tour_skipped", true);
    },

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

    onRemoveClick() {
      this.setModalData({
        key: "confirm",
        value: {
          visibility: true,
          action: "remove this project",
          callback: () => this.onRemoveConfirmed()
        }
      });
    },

    async onRemoveConfirmed() {
      this.loading = true;
      await this.remove();
      this.loading = false;
    },

    onTemplateClick() {
      this.$router.push({ path: `/project` });
    }
  }
};
</script>

<style scoped></style>

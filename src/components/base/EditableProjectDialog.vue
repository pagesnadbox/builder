<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ dialogTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Title *"
                required
                v-model="title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                outlined
                label="Template *"
                :items="templates"
                required
                item-text="name"
                item-value="key"
                v-model="template"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Description"
                v-model="description"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="onSaveClick">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      templates: [
        {
          name: "Base",
          key: "base"
        },
        {
          name: "Landing Page",
          key: "landing-page"
        }
      ]
    };
  },

  computed: {
    ...mapState("editableDialog", ["visible", "editMode", "data"]),

    dialog: {
      get() {
        return this.visible;
      },
      set(value) {
        this.setVisible(value);
      }
    },

    title: {
      get() {
        return this.data.title;
      },
      set(value) {
        this.setData({ ...this.data, title: value });
      }
    },

    template: {
      get() {
        return this.data.template;
      },
      set(value) {
        this.setData({ ...this.data, template: value });
      }
    },

    description: {
      get() {
        return this.data.description;
      },
      set(value) {
        this.setData({ ...this.data, description: value });
      }
    },

    dialogTitle() {
      return this.editMode ? "Edit Project" : "Create New";
    }
  },

  methods: {
    ...mapActions("editableDialog", ["setVisible", "setData"]),
    ...mapActions("projects", ["create", "edit"]),

    onSaveClick() {
      this.dialog = false;
      this.editMode ? this.edit() : this.create();
    }
  }
};
</script>

<style></style>

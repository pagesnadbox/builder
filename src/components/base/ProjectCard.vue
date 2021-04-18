<template>
  <v-card v-bind="$attrs" v-on="$listeners" class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" :src="image"> </v-img>

    <v-card-title>{{ title }}</v-card-title>

    <v-card-text class="text--primary">
      <div class="text-truncate">{{ description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click.stop="onEditClick" depressed color="primary">
        Edit
      </v-btn>
      <v-btn @click.stop="onRemoveClick" depressed color="red" dark>
        Remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    id: {
      type: [String, Number],
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    title: {
      type: String,
      default: ""
    },

    description: {
      type: String,
      default: ""
    }
  },

  methods: {
    ...mapActions("editableDialog", [
      "setVisible",
      "setEditMode",
      "setData",
    ]),

    onEditClick() {
      this.setData({
        title: this.title,
        description: this.description,
        id: this.id
      });

      this.setEditMode(true);
      this.setVisible(true);

      this.$emit("edit-click")
    },

    onRemoveClick() {
      this.$emit("remove-click")
    }
  }
};
</script>

<style></style>

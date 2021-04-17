<template>
  <v-card :to="$attrs.to" v-on="$listeners" class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="200px" :src="image"> </v-img>

    <v-card-title>{{ title }}</v-card-title>

    <v-card-text class="text--primary">
      <div class="text-truncate">{{ description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">
        Edit
      </v-btn>
      <v-btn color="red" dark>
        Remove
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
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
  }
};
</script>

<style></style>

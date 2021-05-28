<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 6 : 0"
        v-on="$listeners"
        rounded="lg"
        outlined
        class="text-center"
      >
        <div class="pa-1">
          <v-icon size="70">{{ icon }}</v-icon>
        </div>
        <v-divider class="my-2"></v-divider>
        <p class="mb-2 caption">{{ name }}</p>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },

    name: {
      type: String,
      default: ""
    }
  }
};
</script>

<style></style>

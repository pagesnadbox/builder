<template>
  <div>
    <v-item-group class="d-flex justify-center">
      <v-item v-if="clearable" :value="'primary'">
        <v-icon
          @click="onValueChange('')"
          outlined
          class="ma-2"
          size="36"
          style="cursor: pointer"
        >
          mdi-block-helper</v-icon
        >
      </v-item>

      <v-item v-for="(color, i) in colors" :key="i" :value="color">
        <template v-slot="{ active, toggle }">
          <base-avatar
            @click="onValueChange(color)"
            :color="color"
            :outlined="active"
            class="ma-2"
            size="38"
            style="cursor: pointer"
            @click.stop="toggle"
          />
        </template>
      </v-item>

      <v-divider vertical class="mx-2"></v-divider>

      <v-item>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          top
          left
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <base-avatar
              v-bind="attrs"
              v-on="on"
              color="blue"
              :outlined="colors.indexOf(value) === -1"
              class="ma-2 color-picker-activator"
              size="38"
              style="cursor: pointer"
            />
          </template>
          <v-card>
            <v-card-text>
              <v-color-picker
                class="ma-2"
                show-swatches
                :value="value"
                @input="onValueChange"
              />
            </v-card-text>
          </v-card>
        </v-menu>
      </v-item>
    </v-item-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },

    clearable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      menu: false,
    };
  },

  computed: {
    colors() {
      return [
        this.$vuetify.theme.isDark ? "#50778D" : "#42A5F6",
        "#009688",
        "#9368e9",
        "#F4511E"
      ]
    }
  },

  methods: {
    onValueChange(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.color-picker-activator >>> .v-avatar {
  background: linear-gradient(
    19deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
}
</style>

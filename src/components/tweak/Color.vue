<template>
  <div>
    <v-item-group class="d-flex justify-center">
      <v-item v-if="clearable" :value="''">
        <v-icon
          @click="onValueChange(null)"
          outlined
          class="ma-2"
          size="36"
          style="cursor: pointer"
        >
          mdi-block-helper</v-icon
        >
      </v-item>

      <v-item v-for="(color, i) in colors" :key="i" :value="color">
        <template v-slot="{ toggle }">
          <base-avatar
            @click="onValueChange(color)"
            :color="color"
            :outlined="color === value"
            class="ma-2"
            size="36"
            style="cursor: pointer"
            @click.stop="toggle"
          />
        </template>
      </v-item>

      <v-divider vertical class="mx-2"></v-divider>

      <v-item v-if="showPrimary" :value="data.app.primary">
        <base-avatar
          @click.stop="onValueChange(data.app.primary)"
          :color="data.app.primary"
          :outlined="data.app.primary === value"
          class="ma-2"
          size="36"
          style="cursor: pointer"
        />
      </v-item>

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
              size="36"
              style="cursor: pointer"
            />
          </template>
          <v-card>
            <v-card-text>
              <v-color-picker
                class="ma-2"
                show-swatches
                :value="value"
                @input="onValueChange($event, true)"
              />
            </v-card-text>
            <v-divider v-if="recentColors.length"></v-divider>

            <v-card-actions>
              <v-item-group class="d-flex align-center justify-center">
                <v-item
                  v-for="(color, i) in recentColors.slice(0, 7)"
                  :key="i"
                  :value="color"
                >
                  <template v-slot="{ toggle }">
                    <base-avatar
                      @click="onValueChange(color)"
                      :color="color"
                      :outlined="color === value"
                      class="ma-2"
                      size="32"
                      style="cursor: pointer"
                      @click.stop="toggle"
                    />
                  </template>
                </v-item>
              </v-item-group>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-item>
    </v-item-group>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    value: {
      type: String,
      default: ""
    },

    clearable: {
      type: Boolean,
      default: false
    },

    showPrimary: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      menu: false,
      recentColors: []
    };
  },

  computed: {
    ...mapState("engine", ["data"]),

    colors() {
      return [
        this.$vuetify.theme.isDark ? "#50778D" : "#42A5F6",
        "#009688",
        "#9368e9"
      ];
    }
  },

  methods: {
    onValueChange(value, addToRecent) {
      if (addToRecent && this.recentColors[0] !== value) {
        this.recentColors.unshift(value);
      }
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

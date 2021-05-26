<template>
  <div class="text-center">
    <v-expansion-panels v-model="panel" flat>
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-0">
          Add Components
        </v-expansion-panel-header>
        <v-expansion-panel-content class="px-0">
          <v-card flat>
            <v-card-text>
              <v-select
                label="Pick component"
                v-model="selected"
                item-text="displayName"
                item-value="componentName"
                :return-object="false"
                :items="items"
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="$emit('close-click')">
                Cancel
              </v-btn>
              <v-btn color="primary" text @click="onSaveClick">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },

    panelOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      panel: 0,
      menu: false,
      selected: null
    };
  },

  created() {
    this.panel = this.panelOpen ? 0 : null;
  },

  methods: {
    onSaveClick() {
      this.menu = false;
      this.$emit("save-click", { component: this.selected });
    }
  }
};
</script>

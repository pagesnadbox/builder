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
              <v-text-field
                label="Filter components"
                v-model="filter"
              ></v-text-field>

              <v-sheet class="overflow-auto" height="500">
                <v-container class="pa-3">
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                      :xl="compact ? 6 : 4"
                      v-for="(item, index) in filteredItems"
                      :key="index"
                    >
                      <ComponentIcon
                        @click="onItemClick(item)"
                        :icon="item.displayIcon"
                        :name="item.displayName"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
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
import ComponentIcon from "../base/ComponentIcon";
export default {
  components: {
    ComponentIcon
  },

  props: {
    items: {
      type: Array,
      default: () => []
    },

    compact: {
      type: Boolean,
      default: false
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
      filter: ""
    };
  },

  computed: {
    filteredItems() {
      return this.items.filter(
        i => i.displayName.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
      );
    }
  },

  created() {
    this.panel = this.panelOpen ? 0 : null;
  },

  methods: {
    onItemClick(item) {
      this.selected = item.componentName;
    },
    onSaveClick() {
      this.menu = false;
      this.$emit("save-click", { component: this.selected });
    }
  }
};
</script>

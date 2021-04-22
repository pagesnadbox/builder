<template>
  <v-treeview
    shaped
    hoverable
    activatable
    :items="entries"
    @update:active="onItemSelected"
    return-object
  >
    <template v-slot:prepend="{ item }">
      <v-icon
        v-if="item.children.length"
        v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
      ></v-icon>
    </template>
  </v-treeview>
</template>

<script>
import config from "../../config";

import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("engine", ["config"]),

    entries() {
      return Object.keys(this.config).map(key => {
        return this.traverse(this.config[key].data, key);
      });
    }
  },

  methods: {
    ...mapActions("settings", ["setComponent"]),

    onItemSelected(event) {
      console.error(event);
      this.setComponent({
        id: event[0].id,
        name: event[0].componentName
      });
    },

    traverse(node, key, currentId) {
      const children = [];
      const thisId = currentId ? `${currentId}-${key}` : key;
      Object.keys(node).forEach(key => {
        if (
          typeof node[key] === "object" &&
          node[key] !== null &&
          !Array.isArray(node[key])
        ) {
          children.push(this.traverse(node[key], key, thisId));
        }
      });

      return {
        id: thisId,
        name: key, //(config[node.componentName] || config.BaseApp).displayName,
        componentName: node.componentName,
        children
      };
    }
  }
};
</script>

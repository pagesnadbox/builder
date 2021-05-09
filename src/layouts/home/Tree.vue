<template>
  <v-treeview
    shaped
    hoverable
    activatable
    :items="entries"
    @update:active="onItemSelected"
    return-object
  >
    <template v-slot:label="{ item }">
      <div
        draggable="true"
        @drop="onDrop($event, item)"
        @dragstart="onDrag($event, item)"
        @dragover="allowDrop($event, item)"
        @dragenter="allowDrop($event, item)"
      >
        <v-icon
          v-if="item.children.length"
          v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
        ></v-icon>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      entries: []
    };
  },

  computed: {
    ...mapState("engine", ["data", "counter"])
  },

  watch: {
    counter: {
      immediate: true,
      handler: "onDataChange"
    }
  },

  methods: {
    ...mapActions("settings", ["setComponent"]),

    onDrop(event, item) {
      console.error("onDrop", event, item);
      event.preventDefault();
    },

    onDrag(event, item) {
      console.error("onDrag", event, item);
    },

    allowDrop(event, item) {
      console.error("allowDrop", event, item);
      event.preventDefault();
    },

    onItemSelected(event) {
      this.$emit("item-selected", event);

      this.setComponent({
        id: event[0].id,
        name: event[0].componentName
      });
    },

    onDataChange() {
      this.entries = Object.keys(this.data).map(key => {
        return this.traverse(this.data[key]);
      });
    },

    traverse(node) {
      const children = [];
      if (node.slots) {
        Object.keys(node.slots).forEach(key => {
          const child = node.slots[key];
          if (
            typeof child === "object" &&
            child !== null &&
            !Array.isArray(child)
          ) {
            children.push(this.traverse(child, key));
          }
        });
      }

      return {
        id: node.id,
        name: node.componentName,
        componentName: node.componentName,
        children
      };
    }
  }
};
</script>

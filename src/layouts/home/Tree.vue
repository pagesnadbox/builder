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

        <v-menu offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              class="tree-item-more-button mr-2 mt-0"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="onItemClick('remove', item)">
              <v-list-item-title>Remove</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onItemClick('hide', item)">
              <v-list-item-title>{{
                item.data.hidden ? "Show" : "Hide"
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onItemClick('add', item)">
              <v-list-item-title>Add</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
    ...mapActions("engine", ["removeSlot"]),

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

    onItemClick(action, item) {
      const actions = {
        add: this.onAdd,
        remove: this.onRemove,
        hide: this.onHide
      };

      actions[action](item);
    },

    onAdd(item) {},

    onRemove(item) {
      this.removeSlot(item);
      this.$action(`config/removeSlot`, item);
    },

    onHide(item) {
      this.$action(`config/setProp`, {
        id: item.id,
        key: "hidden",
        value: !item.data.hidden
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
        children,
        data: node
      };
    }
  }
};
</script>

<style scoped>
.tree-item-more-button {
  position: absolute;
  right: 0;
  top: 6px;
}
</style>

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
      <tree-item-node
        @drop="onDrop($event, item)"
        @drag="onDrag($event, item)"
        @item-click="onItemClick($event, item)"
        :item="item"
      ></tree-item-node>
    </template>
  </v-treeview>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getNextSlotIndex } from "../../utils/helpers";
import TreeItemNode from "./TreeItemNode";

export default {
  components: {
    TreeItemNode
  },

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
    ...mapActions("engine", ["removeSlot", "addSlot"]),

    onDrop(event, item) {
      if (this.draggedNode === item) return;
      const componentName = this.draggedNode.componentName;
      const index = getNextSlotIndex({
        slots: item.data.slots,
        componentName
      });

      this.removeSlot(this.draggedNode);
      this.$action(`config/removeSlot`, this.draggedNode);

      const key = `${componentName}_${index}`;
      const newNode = {
        ...JSON.parse(JSON.stringify(this.draggedNode.data)),
        index: index,
        key
      };

      const payload = {
        id: item.id,
        key,
        value: newNode
      };

      this.addSlot(payload);
      this.$action(`config/addSlot`, payload);

      event.preventDefault();
    },

    onDrag(event, item) {
      this.draggedNode = item;
      console.error("onDrag", event, item);
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
        return this.traverse(this.data[key], key);
      });
    },

    traverse(node, id) {
      const children = [];
      if (node.slots) {
        Object.keys(node.slots).forEach(key => {
          const child = node.slots[key];
          if (
            typeof child === "object" &&
            child !== null &&
            !Array.isArray(child)
          ) {
            children.push(this.traverse(child, `${id}-${key}`));
          }
        });
      }

      return {
        id,
        name: node.componentName,
        componentName: node.componentName,
        children,
        data: node
      };
    }
  }
};
</script>

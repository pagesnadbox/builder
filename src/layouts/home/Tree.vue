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
        @hold-start="hold = true"
        @hold-end="hold = false"
        @drop="onDrop($event, item.data)"
        @drag="onDrag($event, item.data)"
        @item-click="onItemClick($event, item.data)"
        :item="item.data"
        :hasChildren="item.length > 0"
      ></tree-item-node>
    </template>
  </v-treeview>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import TreeItemNode from "./TreeItemNode";

export default {
  components: {
    TreeItemNode
  },

  data() {
    return {
      entries: [],
      hold: false
    };
  },

  computed: {
    ...mapState("engine", ["data", "counter"]),
    ...mapGetters("engine", ["getComponent"])
  },

  watch: {
    counter: {
      immediate: true,
      handler: "onDataChange"
    }
  },

  methods: {
    ...mapActions("settings", ["setComponent"]),

    moveTo(item, to, copy) {
      this.$action(`config/moveSlot`, {
        item,
        to,
        copy
      });
    },

    changePosition(item) {
      this.$action(`config/moveSlot`, {
        item: this.draggedNode,
        to: item.id
      });
    },

    onDrop(event, item) {
      if (this.draggedNode === item) return;

      const siblings = this.draggedNode.parentId === item.parentId;

      if (!siblings || this.hold) {
        this.moveTo(this.draggedNode, item.id);
      } else if (siblings) {
        this.changePosition(item);
      }

      event.preventDefault();
    },

    onDrag(event, item) {
      this.draggedNode = item;
      console.error("onDrag", event, item);
    },

    onItemSelected(event) {
      this.$emit("item-selected", event);

      this.setComponent({
        id: event[0].data.id,
        name: event[0].data.componentName
      });
    },

    onItemClick(action, item) {
      const actions = {
        add: this.onAdd,
        copy: this.onCopy,
        remove: this.onRemove,
        hide: this.onHide
      };

      actions[action](item);
    },

    onAdd(item) {},

    onCopy(item) {
      // this.moveTo(item.data, item.data.parentId, true);
    },

    onRemove(item) {
      this.$action(`config/removeSlot`, item);
    },

    onHide(item) {
      this.$action(`config/setProp`, {
        id: item.id,
        key: "hidden",
        value: !item.hidden
      });
    },

    onDataChange() {
      this.entries = [this.traverse(this.data.app)];
    },

    traverse(node) {
      const children = [];
      if (node.slots) {
        node.slots.forEach(child => {
          children.push(this.traverse(this.getComponent(child)));
        });
      }

      return {
        children,
        data: node
      };
    }
  }
};
</script>

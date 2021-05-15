<template>
  <div
    class="item"
    draggable="true"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @drop="onDrop"
    @dragstart="onDrag"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="allowDrop"
  >
    <v-icon
      v-if="item.children.length"
      v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
    ></v-icon>
    <span>{{ config.displayName }}</span>

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
        <v-list-item @click="onItemClick('copy', item)">
          <v-list-item-title>Copy</v-list-item-title>
        </v-list-item>
        <v-list-item @click="copyToClipBoard(item)">
          <v-list-item-title>Copy id to clipboard</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import componentConfigs from "../../config";
import { EventBus, events } from "../../utils/eventBus";

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    config() {
      return componentConfigs[this.item.name];
    }
  },

  methods: {
    onDragEnter(event) {
      this.holdId = setTimeout(() => {
        this.$emit("hold-start");
      }, 2000);

      event.preventDefault();
    },

    onDragLeave() {
      clearTimeout(this.holdId);
      this.$emit("hold-end");
    },

    onDrop(event) {
      event.preventDefault();
      this.$emit("drop", event);
    },

    onDrag(event) {
      this.$emit("drag", event);
    },

    allowDrop(event) {
      event.preventDefault();
    },

    onItemClick(action) {
      this.$emit("item-click", action);
    },

    copyToClipBoard(item) {
      var data = [
        new ClipboardItem({
          "text/plain": new Blob([item.id], { type: "text/plain" })
        })
      ];

      window.navigator.clipboard.write(data).then(
        function() {
          console.log("Copied to clipboard successfully!");
        },
        function(e) {
          console.error("Unable to write to clipboard. :-(", e);
        }
      );
    },

    onMouseEnter() {
      EventBus.$emit(events.TREE_NODE_MOUSE_ENTER, this.item.id);
    },

    onMouseLeave() {
      EventBus.$emit(events.TREE_NODE_MOUSE_LEAVE, this.item.id);
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

<style scoped>
.after,
.before {
  height: 5px;
  border: 1px dashed;
}
.hold {
  transform: scale(1.2);
}
</style>

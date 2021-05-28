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
      class="mr-4"
      v-if="hasChildren"
      v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
    ></v-icon>
    <span>{{ config.displayName }}</span>
  </div>
</template>

<script>
import componentConfigs from "../../config/index";
import { EventBus, events } from "../../utils/eventBus";

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    hasChildren: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    config() {
      return componentConfigs[this.item.componentName];
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

    copyToClipBoard() {
      var data = [
        new ClipboardItem({
          "text/plain": new Blob([this.item.id], { type: "text/plain" })
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

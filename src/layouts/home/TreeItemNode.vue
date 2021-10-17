<template>
  <div
    class="item"
    :class="{ hold: hold }"
    :draggable="dndEnabled"
    v-on="$listeners"
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
      default: () => ({}),
    },
    hasChildren: {
      type: Boolean,
      default: false,
    },
    dndEnabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      hold: false,
    };
  },

  computed: {
    config() {
      return componentConfigs[this.item.componentName];
    },
  },

  methods: {
    onDragEnter(event) {
      this.holdId = setTimeout(() => {
        this.$emit("hold-start");
        this.hold = true;
      }, 1000);

      event.preventDefault();
    },

    onDragLeave() {
      clearTimeout(this.holdId);
      this.$emit("hold-end");
      this.hold = false;
    },

    onDrop(event) {
      event.preventDefault();
      this.$emit("item-drop", event);
    },

    onDrag(event) {
      this.$emit("item-drag", event);
    },

    allowDrop(event) {
      event.preventDefault();
    },

    onMouseEnter() {
      EventBus.$emit(events.TREE_NODE_MOUSE_ENTER, this.item.id);
    },

    onMouseLeave() {
      clearTimeout(this.holdId);
      this.hold = false;
      EventBus.$emit(events.TREE_NODE_MOUSE_LEAVE, this.item.id);
    },
  },
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
  border: 1px solid greenyellow;
}
</style>

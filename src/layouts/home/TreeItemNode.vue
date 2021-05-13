<template>
  <div
    class="item"
    draggable="true"
    @drop="onDrop($event, item)"
    @dragstart="onDrag($event, item)"
    @dragenter="onDragEnter($event, item)"
    @dragleave="onDragLeave($event, item)"
    @dragover="allowDrop($event, item)"
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

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
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

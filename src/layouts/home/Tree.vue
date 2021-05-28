<template>
  <div class="overflow-auto">
    <v-treeview
      :style="styles"
      shaped
      hoverable
      activatable
      :open.sync="open"
      :active.sync="active"
      :items="entries"
      @update:active="onItemSelected"
    >
      <template v-slot:prepend="{ item }">
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
            <v-list-item @click="onItemClick('remove', item.data)">
              <v-list-item-title>Remove</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onItemClick('hide', item.data)">
              <v-list-item-title>{{
                item.hidden ? "Show" : "Hide"
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onItemClick('add', item.data)">
              <v-list-item-title>Add</v-list-item-title>
            </v-list-item>
            <v-list-item @click="onItemClick('copy', item.data)">
              <v-list-item-title>Copy</v-list-item-title>
            </v-list-item>
            <v-list-item @click="copyToClipBoard()">
              <v-list-item-title>Copy id to clipboard</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:label="{ item }">
        <tree-item-node
          @hold-start="hold = true"
          @hold-end="hold = false"
          @drop="onDrop($event, item.data)"
          @drag="onDrag($event, item.data)"
          :item="item.data"
          :hasChildren="item.children.length > 0"
        ></tree-item-node>
      </template>
    </v-treeview>

    <v-dialog v-model="dialog" max-width="500">
      <v-card class="pa-5">
        <tweak-add-component
          :panelOpen="true"
          :items="Object.values(componentConfigs)"
          @save-click="onSaveClick"
          @close-click="dialog = false"
        ></tweak-add-component>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import componentConfigs from "../../config/index";

import { mapActions, mapGetters, mapState } from "vuex";
import TreeItemNode from "./TreeItemNode";
import { createSlot } from "../../utils/helpers";

export default {
  components: {
    TreeItemNode
  },

  data() {
    return {
      componentConfigs,
      dialog: false,
      entries: [],
      hold: false,
      open: [],
      active: [],
      depth: 0
    };
  },

  computed: {
    ...mapState("settings", ["id", "counter"]),
    ...mapState("engine", ["data"]),
    ...mapGetters("engine", ["getComponent"]),

    styles() {
      console.error(this.open);
      return {
        width: `calc(100% + ${200 + 20 * this.depth}px)`
      };
    }
  },

  watch: {
    counter: {
      immediate: true,
      handler: "onDataChange"
    },
    id: {
      immediate: false,
      handler: "onSelectedIdChange"
    }
  },

  methods: {
    async onSaveClick(data) {
      const payload = createSlot({
        componentName: data.component,
        parentId: this.addId
      });

      const slot = await this.dispatch("addSlot", payload);
      this.setComponent({ id: slot.id, name: slot.componentName });

      this.dialog = false
    },

    ...mapActions("settings", ["setComponent"]),

    onSelectedIdChange(id) {
      let open = [id];
      let component = this.getComponent(id);
      let depth = 0;
      this.active.push(id);

      while (component.parentId) {
        depth++;
        open.push(component.parentId);
        component = this.getComponent(component.parentId);
      }

      this.depth = depth;
      this.open = open;
    },

    moveTo(item, to, copy) {
      this.dispatch("moveSlot", {
        item,
        to,
        copy
      });
    },

    changePosition(item) {
      this.dispatch("changePosition", {
        item: this.draggedNode,
        to: item.id
      });
    },

    dispatch(actionName, payload) {
      return this.$store.dispatch(`engine/${actionName}`, payload);
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
    },

    onItemSelected(event) {
      this.$emit("item-selected", event);

      if (event.length && event[0] !== this.id) {
        const item = this.getComponent(event[0]);
        this.setComponent({
          id: item.id,
          name: item.componentName
        });
      }
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

    onAdd(item) {
      this.dialog = true;
      this.addId = item.id;
    },

    onCopy(item) {
      this.dispatch("copySlot", item);
    },

    onRemove(item) {
      this.dispatch("removeSlot", item);
    },

    onHide(item) {
      this.dispatch("setProp", {
        id: item.id,
        key: "hidden",
        value: !item.hidden
      });
    },

    onDataChange() {
      console.error("here");
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
        id: node.id,
        children,
        data: node
      };
    }
  }
};
</script>

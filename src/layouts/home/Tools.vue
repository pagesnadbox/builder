<template>
  <v-sheet
    :dark="$vuetify.breakpoint.mobile"
    color="transparent"
    id="settings"
    class="text-center"
  >
    <v-icon :disabled="!canUndo" class="mb-3" large @click="onUndoClick">
      mdi-undo-variant
    </v-icon>
    <v-icon :disabled="!canRedo" class="mb-3" large @click="onRedoClick">
      mdi-redo-variant
    </v-icon>
    <v-icon class="mb-3" large @click="onFullscreenClick">
      {{ fullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen" }}
    </v-icon>
    <!-- <v-icon class="mb-3" large @click="onResetClick">
      mdi-lock-reset
    </v-icon> -->
    <v-icon class="mb-3" large @click="onToggleCompact">
      mdi-rotate-right-variant
    </v-icon>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { EventBus, events } from "../../utils/eventBus";

export default {
  name: "HomeTools",

  computed: {
    ...mapState("settings", ["canRedo", "canUndo", "images", "fullscreen"])
  },

  created() {
    EventBus.$on("on-keydown", this.onKeyDown.bind(this));
  },

  methods: {
    ...mapActions("settings", ["toggleCompact", "setFullscreen"]),

    // history

    onUndoClick() {
      this.undo();
    },

    onRedoClick() {
      this.redo();
    },

    onResetClick() {
      EventBus.$emit(events.HISTORY_RESET);
    },

    onFullscreenClick() {
      this.setFullscreen(!this.fullscreen);
    },

    undo() {
      if (this.canUndo) {
        EventBus.$emit(events.HISTORY_UNDO);
      }
    },

    redo() {
      if (this.canRedo) {
        EventBus.$emit(events.HISTORY_REDO);
      }
    },

    onKeyDown(e) {
      if (e.ctrlKey && e.keyCode === 90) {
        e.shiftKey ? this.redo() : this.undo();
      }
    },

    onToggleCompact() {
      this.toggleCompact();
    }
  }
};
</script>

<template>
  <v-sheet
    :dark="$vuetify.breakpoint.mobile"
    color="transparent"
    id="settings"
    class="text-center"
  >
    <div class="mb-3">
      <ToolIcon
        tooltip="Undo"
        :disabled="!canUndo"
        class="mb-3"
        large
        @click="onUndoClick"
      >
        mdi-undo-variant
      </ToolIcon>
    </div>

    <div class="mb-3">
      <ToolIcon
        tooltip="Redo"
        :disabled="!canRedo"
        class="mb-3"
        large
        @click="onRedoClick"
      >
        mdi-redo-variant
      </ToolIcon>
    </div>
    <div class="mb-3">
      <ToolIcon
        tooltip="Toggle Fullscreen"
        id="fullscreenBtn"
        class="mb-3"
        large
        @click="onFullscreenClick"
      >
        {{ fullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen" }}
      </ToolIcon>
    </div>
    <div class="mb-3">
      <ToolIcon
        tooltip="Undock panel"
        id="undockPanelBtn"
        class="mb-3"
        large
        @click="onToggleCompact"
      >
        mdi-rotate-right-variant
      </ToolIcon>
    </div>
    <div class="mb-3">
      <ToolIcon
        tooltip="Toggle edit mode"
        id="editToggle"
        class="mb-3"
        :color="allowEdit ? 'primary' : null"
        large
        @click="setAllowEdit(!allowEdit)"
      >
        mdi-pencil-outline
      </ToolIcon>
    </div>

    <v-tour name="tools" :steps="steps" :callbacks="tourCallbacks"></v-tour>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { EventBus, events, eventsInternal } from "../../utils/eventBus";
import ToolIcon from "./ToolIcon";

export default {
  name: "HomeTools",

  components: {
    ToolIcon
  },

  data() {
    return {
      steps: [
        {
          target: "#fullscreenBtn", // We're using document.querySelector() under the hood
          content: `Toggle fullscreen on/off and review your page on different devices.`
        },
        {
          target: "#undockPanelBtn", // We're using document.querySelector() under the hood
          content: `Undock the builder panel into a separte window.`
        },
        {
          target: "#editToggle", // We're using document.querySelector() under the hood
          content: `Toggle to start editing the page. Hover over any component and click to select it.`
        }
      ],
      tourOptions: {
        labels: {
          buttonStop: "Next"
        }
      },
      tourCallbacks: {
        onFinish: () => EventBus.$emit(eventsInternal.TOUR_FINISHED, "tools"),
        onSkip: () => EventBus.$emit(eventsInternal.TOUR_SKIPPED)
      }
    };
  },

  computed: {
    ...mapState("settings", [
      "canRedo",
      "canUndo",
      "images",
      "fullscreen",
      "allowEdit"
    ])
  },

  created() {
    EventBus.$on("on-keydown", this.onKeyDown.bind(this));
  },

  methods: {
    ...mapActions("settings", [
      "toggleCompact",
      "setFullscreen",
      "setAllowEdit"
    ]),

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

<template>
  <div>
    <v-sheet
      :dark="$vuetify.breakpoint.mobile"
      color="transparent"
      id="settings"
      class="text-center"
    >
      <div class="my-3">
        <ToolIcon tooltip="Toggle builder panel" large @click="menu = !menu">
          mdi-cog
        </ToolIcon>
      </div>
    </v-sheet>

    <component :is="settingsComponent" v-model="menu">
      <v-card-text ref="scrollableContainer">
        <SettingsTabs />
      </v-card-text>
    </component>

    <v-tour
      name="settings"
      :options="tourOptions"
      :steps="steps"
      :callbacks="tourCallbacks"
    ></v-tour>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import SettingsTabs from "./SettingsTabs";
import SettingsModal from "@/components/tweak/SettingsModal";
import SettingsBottomSheet from "@/components/tweak/SettingsBottomSheet";
import { EventBus, eventsInternal } from "../../utils/eventBus";
import ToolIcon from "./ToolIcon";

export default {
  name: "HomeSettings",

  components: {
    SettingsTabs,
    SettingsModal,
    SettingsBottomSheet,
    ToolIcon
  },

  data() {
    return {
      steps: [
        {
          target: "#settings-gear", // We're using document.querySelector() under the hood
          header: {
            title: "Get Started"
          },
          content: `Toggle the builder tweak panel.`
        }
      ],
      tourOptions: {
        labels: {
          buttonStop: "Next"
        }
      },
      tourCallbacks: {
        onFinish: () =>
          EventBus.$emit(eventsInternal.TOUR_FINISHED, "settings"),
        onSkip: () => EventBus.$emit(eventsInternal.TOUR_SKIPPED)
      }
    };
  },

  watch: {
    id() {
      !this.isDesktop &&
        this.$refs.scrollableContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  },

  mounted() {
    const skipped = localStorage.getItem("pagesandbox_tour_skipped") === "true";
    if (!skipped) {
      this.$tours["settings"].start();
    }
  },

  computed: {
    ...mapState("settings", ["open", "compact", "bottom"]),

    settingsComponent() {
      return !this.isDesktop || this.bottom
        ? SettingsBottomSheet
        : SettingsModal;
    },

    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp;
    },

    menu: {
      get() {
        return this.open && (this.compact || !this.isDesktop);
      },
      set() {
        this.setOpen(!this.open);
      }
    }
  },

  methods: {
    ...mapActions("settings", ["setOpen"])
  }
};
</script>

<template>
  <v-menu
    v-model="visible"
    content-class="menu-wrapper"
    :close-on-content-click="false"
    :close-on-click="false"
    max-height="90vh"
    scrollable
    offset-overflow
    :position-x="position.x"
    :position-y="position.y"
    origin="top right"
    transition="scale-transition"
  >
    <v-card class="py-2" width="400">
      <div
        class="text-center"
        style="cursor: move"
        @mousedown="onMouseDown"
        @touchstart="onMouseDown"
      >
        <v-icon>mdi-menu</v-icon>

        <v-icon
          class="mt-1"
          style="right: 20px; position: absolute"
          @click="visible = false"
        >
          mdi-close
        </v-icon>
        <v-icon
          class="mt-1"
          style="right: 50px; position: absolute"
          @click="setCompact(false)"
        >
          mdi-border-right
        </v-icon>
      </div>

      <slot />
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";
import { EventBus } from "../../utils/eventBus";
import SettingsMixin from "./settingsMixin";

const position = {
  x: 0,
  y: 0
};

export default {
  mixins: [SettingsMixin],

  data() {
    return {
      mousedown: false,
      position: Object.freeze(position)
    };
  },

  watch: {
    visible: "setMenuRef",

    mousedown(value) {
      document.body.classList.toggle("prevent-user-select", value);
    }
  },

  created() {
    this.setStaticData();

    EventBus.$on("on-mouseup", this.onMouseUp.bind(this));
    EventBus.$on("on-mousemove", this.onMouseMoveBind);
  },

  beforeDestroy() {
    EventBus.$off("on-mouseup", this.onMouseUpBind);
    EventBus.$off("on-mousemove", this.onMouseMoveBind);
  },

  mounted() {
    this.setMenuRef();
  },

  methods: {
    ...mapActions("settings", ["setCompact"]),
    setStaticData() {
      this.staticData && this.staticData();

      this.onMouseUpBind = this.onMouseUp.bind(this);
      this.onMouseMoveBind = this.onMouseMove.bind(this);
    },

    onMouseDown() {
      this.mousedown = true;
    },

    onMouseUp() {
      this.mousedown = false;
    },

    staticData() {
      this.x = 0;
      this.y = 0;
    },

    setMenuRef() {
      this.$nextTick(() => {
        this.menuRef = document.querySelector(".menu-wrapper");
        if (this.menuRef) {
          this.menuRef.style.position = "fixed";
          this.menuRef.style.top = "12px";
          this.menuRef.style.left = "12px";
        }
      });
    },

    onMouseMove(event) {
      if (this.mousedown) {
        this.setPosition(event);

        const transform = `translate(${this.x}px, ${this.y}px)`;

        this.menuRef.style.transform = transform;
      }
    },

    setPosition({ movementX, movementY }) {
      this.x += movementX;
      this.y += movementY;

      const maxX = window.innerWidth - this.menuRef.offsetWidth - 40;
      const maxY = window.innerHeight - this.menuRef.offsetHeight - 25;

      if (maxX < this.x) {
        this.x = maxX;
      }
      if (this.x < 0) {
        this.x = 0;
      }
      if (maxY < this.y) {
        this.y = maxY;
      }
      if (this.y < 0) {
        this.y = 0;
      }

      window.localStorage.setItem("settings_position_x", this.x);
      window.localStorage.setItem("settings_position_y", this.y);
    }
  }
};
</script>

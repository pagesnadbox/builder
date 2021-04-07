<template>
  <base-section
    :height="height"
    :color="data.color"
    :editable="false"
    v-on="listeners"
    v-bind="attrs"
  >
    <base-vuetify-img
      :class="{ 'white--text': data.heroContainer.dark }"
      :gradient="gradient"
      v-bind="img"
      :editable="false"
    >
      <v-container class="fill-height px-4 py-12">
        <v-row justify="center" align="center">
          <v-col :cols="cols">
            <base-hero-container
              id="hero-heroContainer"
              class="d-flex align-center mx-auto"
              height="100%"
              width="100%"
              :data="data.heroContainer"
              v-bind="data.heroContainer"
            >
            </base-hero-container>
          </v-col>
          <v-col
            v-if="!data.img.hidden && (data.img.src || data.img.srcDark)"
            :cols="cols"
          >
            <v-row justify="center" align="center">
              <base-img v-bind="data.img"></base-img>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </base-vuetify-img>
  </base-section>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],

  name: "BaseHero",

  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    cols() {
      return this.isMobile ? "12" : undefined;
    },

    gradient() {
      return this.data.overlay
        ? `to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)`
        : "";
    },

    img() {
      return {
        height: "100%",
        mobileHeight: "100%",
        src: !this.data.color ? this.data.src : ".",
        srcDark: !this.data.color ? this.data.srcDark : "."
      };
    },

    height() {
      let height;

      if (this.$vuetify.breakpoint.mdAndUp) {
        height = this.data.height ? `${this.data.height}px` : "100vh";
      } else {
        height = this.data.mobileHeight
          ? `${this.data.mobileHeight}px`
          : "70vh";
      }

      return height; // `calc(${height} - ${this.$vuetify.application.top}px)`;
    }
  }
};
</script>

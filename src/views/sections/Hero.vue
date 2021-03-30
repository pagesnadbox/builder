<template>
  <section id="hero">
    <base-vuetify-img
      id="hero-img"
      :class="{ 'white--text': data.resizeContainer.dark }"
      gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)"
      v-bind="data.img"
      :min-height="height"
    >
      <v-container class="fill-height px-4 py-12">
        <base-resize-container
          id="hero-resizeContainer"
          class="d-flex align-center"
          height="100%"
          width="100%"
          v-bind="data.resizeContainer"
        >
          <v-col cols="12">
            <base-subheading id="hero-subheading" v-bind="subheading" />
          </v-col>
          <v-col cols="12">
            <base-heading id="hero-heading" v-bind="heading" />
          </v-col>
          <v-col cols="12">
            <base-body
              id="hero-body"
              v-bind="body"
              :dark="data.resizeContainer.dark"
            >
              {{ data.body }}
            </base-body>
          </v-col>
          
          <base-actions :data="data.actions" :hasOr="true" :id="data.actions.id"/>
        </base-resize-container>
      </v-container>
    </base-vuetify-img>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {

  computed: {
    ...mapState("hero", ["data"]),
    subheading() {
      return {
        align: this.data.resizeContainer.align,
        ...this.data.subheading
      };
    },
    heading() {
      return {
        align: this.data.resizeContainer.align,
        ...this.data.heading
      };
    },
    body() {
      return {
        align: this.data.resizeContainer.align,
        ...this.data.body
      };
    },

    height() {
      let height;

      if (this.$vuetify.breakpoint.mdAndUp) {
        height = this.data.img.height ? `${this.data.img.height}px` : "100vh";
      } else {
        height = this.data.img.mobileHeight
          ? `${this.data.img.mobileHeight}px`
          : "70vh";
      }

      return height; // `calc(${height} - ${this.$vuetify.application.top}px)`;
    }
  }
};
</script>

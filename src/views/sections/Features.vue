<template>
  <v-theme-provider :dark="data.dark">
    <base-section id="features" v-bind="data">
      <base-section-heading
        class="px-2"
        id="features-heading"
        :text-dark="data.dark"
        v-bind="heading"
      />
      <v-responsive class="mx-auto pa-5" max-width="1350">
        <base-list class="px-2" id="features-list" v-bind="data.list">
          <template v-slot:item="{ item, i }">
            <base-info-card
              :id="`features-list-items-${i}`"
              class="pa-2"
              :text-dark="data.dark"
              :dark="data.dark"
              v-bind="item"
            />
          </template>
        </base-list>
      </v-responsive>
    </base-section>
  </v-theme-provider>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SectionFeatures",

  computed: {
    ...mapState("features", ["data"]),
    heading() {
      return {
        ...this.data.heading,
        color: this.data.heading.color || this.data.color
      };
    }
  }
};
</script>

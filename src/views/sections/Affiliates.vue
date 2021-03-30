<template>
  <base-section id="affiliates" v-bind="data">
    <v-container>
      <base-section-heading
        id="affiliates-heading"
        :editable-props="false"
        v-bind="heading"
      />

      <base-slide-list id="affiliates-list" :items="data.list.items">
        <template v-slot:item="{ item, i }">
          <v-slide-item :key="i" class="align-self-center">
            <base-vuetify-img
              :id="`affiliates-list-items-${i}`"
              height="40"
              width="128"
              v-bind="item"
              :dark="data.dark"
              color="grey"
              contain
            />
          </v-slide-item>

          <v-responsive
            v-if="i < data.list.items.length"
            :key="`divider-${i}`"
            class="text-center"
            height="56"
            width="48"
          >
            <v-divider vertical />
          </v-responsive>
        </template>
      </base-slide-list>
    </v-container>
  </base-section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SectionAffiliates",
  computed: {
    ...mapState("affiliates", ["data"]),
    heading() {
      return {
        ...this.data.heading,
        color: this.data.heading.color || this.data.color
      };
    }
  }
};
</script>

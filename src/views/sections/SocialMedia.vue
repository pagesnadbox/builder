<template>
  <v-theme-provider :dark="data.dark">
    <base-section
      id="social"
      v-bind="data"
      class="text-center"
    >
      <base-slide-list
        id="social-list"
        v-bind="data.list"
      >
        <template v-slot:item="{ item, i }">
          <base-icon
            :id="`social-list-items-${i}`"
            v-bind="item"
            class="ma-4"
          />
        </template>
      </base-slide-list>

      <base-section-heading
        id="social-heading"
        v-bind="heading"
      />

      <base-link v-bind="data.link" />

      <div class="py-4" />

      <base-btn
        id="social-action"
        class="font-weight-bold"
        light
        x-large
        v-bind="action.data"
      >
        {{ action.text }}
      </base-btn>
    </base-section>
  </v-theme-provider>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'SectionNews',

    computed: {
      ...mapState('social', ['data']),
      heading () {
        return {
          ...this.data.heading,
          color: this.data.heading.color || this.data.color,
        }
      },
      action () {
        const { text, ...data } = this.data.action

        return { text, data }
      },
    },
  }
</script>

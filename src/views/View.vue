<template>
  <section :id="id">
    <v-row no-gutters>
      <v-col cols="12">
        <component
          :is="`section-${section}`"
          v-for="section in itemsFormattedKeyOnly"
          :key="section"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'BaseView',

    props: {
      id: {
        type: String,
        default: 'view',
      },
    },

    data: () => ({ sections: [] }),

    computed: {
      ...mapState('app', ['data']),
      ...mapGetters('app', ['itemsFormattedKeyOnly']),
    },
  }
</script>

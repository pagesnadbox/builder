<template>
  <v-container
    v-bind="attrs"
    :style="styles"
    v-on="listeners"
  >
    <v-row>
      <v-col
        v-for="(item, i) in items.filter(i => !i.hidden)"
        :key="i"
        :cols="12 / cols"
        :md="12 / md"
      >
        <slot
          name="item"
          :item="item"
          :i="i"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import mixin from './mixin'
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseList',

    mixins: [Heading, mixin],

    props: {
      space: {
        type: [Number, String],
        default: 96,
      },
      items: {
        type: Array,
        default: () => [],
      },
      cols: {
        type: String,
        default: '12',
      },
      md: {
        type: String,
        default: '6',
      },
    },
  }
</script>

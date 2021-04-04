<template>
  <v-container
    v-bind="attrs"
    v-on="listeners"
  >
    <v-slide-group>
      <template v-for="(item, i) in items.filter(i => !i.hidden)">
        <span
          :key="i"
          class="d-flex"
        >
          <slot
            name="item"
            :item="item"
            :i="i"
          />
        </span>
      </template>
    </v-slide-group>
  </v-container>
</template>

<script>
  import mixin from './mixin'

  export default {
    name: 'BaseSlideList',

    mixins: [mixin],

    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
  }
</script>

<style scoped>
>>> .v-slide-group__content {
  justify-content: space-between;
}
</style>

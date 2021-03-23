<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        x-large
        color="indigo"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Icon
      </v-btn>
    </template>

    <tweak-icon-explorer @icon-click="onIconClick" />
  </v-menu>
</template>

<script>
  export default {
    name: 'TweakIcon',
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),

    methods: {
      onIconClick (value) {
        this.$emit('value-change', value)
      },
    },
  }
</script>

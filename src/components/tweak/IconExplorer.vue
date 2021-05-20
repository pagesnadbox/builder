<template>
  <v-card max-width="500px">
    <v-card-title class="text-h5">
      Choose an icon
    </v-card-title>
    <v-divider></v-divider>

    <v-card-text max-height="500px">
      <v-text-field
        v-model="searchTerm"
        label="Search"
        class="mt-4"
        dense
        outlined
      />
      <div class="pa-2 icon-list-container">
        <span
          v-for="(icon, i) in iconsFiltered"
          :key="i"
          class="pa-2"
        >
          <v-icon
            large
            @click="onIconClick(icon)"
          >{{ icon }}</v-icon>
        </span>
      </div>

      <div
        v-if="pages"
        class="text-center"
      >
        <hr class="my-4">

        <v-pagination
          v-model="page"
          :length="pages"
        />
      </div>
    </v-card-text>

    <v-divider />
  </v-card>
</template>

<script>
  import icons from '../../utils/icons'
  export default {
    data () {
      return {
        searchTerm: '',
        visibleIcons: 100,
        page: 1,
      }
    },
    computed: {
      iconsFiltered () {
        return this.icons.slice(
          (this.page - 1) * this.visibleIcons,
          this.page * this.visibleIcons,
        )
      },

      icons () {
        return icons.filter((icon) => icon.indexOf(this.searchTerm) > -1)
      },

      pages () {
        return Math.round(this.icons.length / this.visibleIcons)
      },
    },
    watch: {
      searchTerm: 'onSearchTermChange',
    },
    methods: {
      onIconClick (value) {
        this.$emit('icon-click', value)
      },

      onSearchTermChange () {
        this.page = 1
      },

    },
  }
</script>

<style scoped>
.icon-list-container {
  max-height: 50vh;
  overflow-y: scroll;
}
</style>

<template>
  <v-app>
    <home-app-bar />

    <home-view />

    <home-footer />

    <home-settings />

    <home-gallery />

    <home-tools />
  </v-app>
</template>

<script>
  export default {
    name: 'HomeLayout',

    components: {
      HomeAppBar: () => import('@/layouts/home/AppBar'),
      HomeFooter: () => import('@/layouts/home/Footer'),
      HomeSettings: () => import('@/layouts/home/Settings'),
      HomeTools: () => import('@/layouts/home/Tools'),
      HomeView: () => import('@/layouts/home/View'),
      HomeGallery: () => import('@/components/tweak/Gallery'),
    },
  }
</script>

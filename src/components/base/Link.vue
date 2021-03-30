<template>
  <a
    class="d-inline-block mb-8"
    :href="href"
    style="text-decoration: none"
    :target="targetFormatted"
    v-bind="attrs"
    v-on="listeners"
  >
    {{ href }}
  </a>
</template>

<script>
  import mixin from './mixin'

  export default {
    name: 'BaseLink',

    mixins: [mixin],

    props: {
      
      href: {
        type: String,
        default: '',
      },

      openInNewTab: {
        type: Boolean,
        default: true,
      },

    },
    computed: {
      targetFormatted () {
        return this.openInNewTab ? '_blank' : '_self'
      },
    },
  }
</script>

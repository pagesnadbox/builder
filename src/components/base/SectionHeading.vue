<template>
  <v-sheet
    class="base-section-heading"
    :style="styles"
    v-bind="attrs"
    v-on="listeners"
  >
    <base-avatar
      v-if="icon"
      :icon="icon"
      :outlined="outlined"
      :align="align"
      class="mb-4"
      :dark="dark"
      :size="size"
      :color="iconColor"
      :editable="editableProps"
    />

    <base-subtitle
      v-if="subtitle"
      :editable="editableProps"
      :title="subtitle"
      :dark="dark"
      space="1"
      tag="h2"
    />

    <base-subheading
      v-if="title"
      :id="ids.subheading"
      :align="align"
      :title="title"
      :dark="dark"
      class="text-uppercase"
      space="2"
      :editable="editableProps"
    />

    <base-divider :color="color" />

    <base-body
      v-if="$slots.default || text"
      :id="ids.body"
      :dark="dark || textDark"
      :editable="editableProps"
      :align="align"
      max-width="700"
    >
      <slot v-if="$slots.default" />

      <template v-else>
        {{ text }}
      </template>
    </base-body>
  </v-sheet>
</template>

<script>
// Mixins
  import Heading from '@/mixins/heading'
  import mixin from './mixin'

  export default {
    name: 'BaseSectionHeading',

    mixins: [Heading, mixin],

    props: {
      editableProps: {
        type: Boolean,
        default: true,
      },
      dark: {
        type: Boolean,
        default: false,
      },
      textDark: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'center',
      },
      iconColor: {
        type: String,
        default: '',
      },
      align: {
        type: String,
        default: 'center',
      },
      color: {
        type: String,
        default: '#42A5F6',
      },
      icon: String,
      outlined: Boolean,
      space: {
        type: [Number, String],
        default: 12,
      },
      subtitle: String,
      text: String,
      title: String,
    },

    computed: {
      classes () {
        return [`text-${this.align}`]
      },
      ids () {
        return {
          subheading: `${this.$attrs.id}-subheading`,
          body: `${this.$attrs.id}-body`,
        }
      },
    },
  }
</script>

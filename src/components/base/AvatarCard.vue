<template>
  <div
    class="pt-2"
    v-bind="attrs"
    v-on="listeners"
  >
    <base-avatar
      v-if="icon"
      :id="ids.avatar"
      :editable="editableProps"
      :color="color"
      :dark="dark"
      :icon="icon"
      :outlined="outlined"
      :size="size"
      class="mb-3 align-self-start"
    />

    <div :class="horizontal && title && 'ml-6'">
      <base-title
        :id="ids.title"
        :editable="editableProps"
        :align="align"
        :title="title"
        :dark="textDark"
        class="text-uppercase"
        space="3"
      />

      <base-body
        v-if="text || $slots.default"
        :id="ids.body"
        :editable="editableProps"
        :dark="textDark"
        :space="horizontal ? 0 : undefined"
        :text="text"
        max-width="700"
        :align="align"
      >
        <slot />
      </base-body>
    </div>
  </div>
</template>

<script>
// Mixins
  import Heading from '@/mixins/heading'
  import mixin from './mixin'

  export default {
    name: 'BaseAvatarCard',

    mixins: [Heading, mixin],

    props: {
      editableProps: Boolean,
      align: {
        type: String,
        default: 'left',
      },
      color: String,
      dark: Boolean,
      textDark: Boolean,
      horizontal: Boolean,
      icon: String,
      outlined: {
        type: Boolean,
        default: true,
      },
      space: {
        type: [Number, String],
        default: 8,
      },
      size: {
        type: [Number, String],
        default: 72,
      },
      text: String,
      title: String,
    },

    computed: {
      ids () {
        return {
          avatar: `${this.$attrs.id}-avatar`,
          title: `${this.$attrs.id}-title`,
          body: `${this.$attrs.id}-body`,
        }
      },
      classes () {
        const classes = [`mb-${this.space}`]

        if (this.horizontal) {
          classes.push('d-flex')

          if (!this.$slots.default && !this.text) {
            classes.push('align-center')
          }
        }

        return classes
      },
    },
  }
</script>

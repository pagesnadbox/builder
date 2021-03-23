<template>
  <v-theme-provider :dark="dark">
    <v-container
      v-bind="attrs"
      class="pa-0"
      v-on="listeners"
    >
      <v-row
        :justify="justify"
        no-gutters
      >
        <v-col
          v-if="icon"
          :class="`text-${align}`"
          cols="12"
          class="mb-4"
        >
          <base-icon
            :id="ids.icon"
            :align="align"
            :editable="editableProps"
            :color="color"
          >
            {{ icon }}
          </base-icon>
        </v-col>

        <v-col
          v-if="title || subtitle"
          :cols="callout ? 9 : 12"
        >
          <base-subtitle
            v-if="subtitle"
            :id="ids.subtitle"
            :align="align"
            :editable="editableProps"
            :title="subtitle"
            space="1"
          />

          <base-title
            :id="ids.title"
            :align="align"
            :editable="editableProps"
            :title="title"
            class="text-uppercase"
            space="1"
          />

          <base-divider
            :align="align"
            :editable="editableProps"
            :color="color"
          />

          <base-body
            v-if="text || $slots.default"
            :id="ids.body"
            :align="align"
            :editable="editableProps"
            :text="text"
            space="6"
          >
            <slot />
          </base-body>
        </v-col>

        <v-col
          v-if="callout"
          cols="2"
        >
          <div
            class="text-h2 grey--text text--lighten-4 font-weight-bold pr-8"
            v-text="callout"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
// Mixins
  import mixin from './mixin'
  import Heading from '@/mixins/heading'

  export default {
    name: 'BaseInfoCard',

    mixins: [Heading, mixin],

    props: {
      editableProps: Boolean,
      dark: Boolean,
      callout: String,
      color: {
        type: String,
        default: '#42A5F6',
      },
      icon: String,
      subtitle: String,
      text: String,
      title: String,
    },

    computed: {
      ids () {
        return {
          icon: `${this.$attrs.id}-icon`,
          body: `${this.$attrs.id}-body`,
          title: `${this.$attrs.id}-title`,
          subtitle: `${this.$attrs.id}-subtitle`,
        }
      },
    },
  }
</script>

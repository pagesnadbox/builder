<template>
  <v-list-item v-on="$listeners">
    <v-list-item-icon v-if="item.icon">
      <v-icon v-text="item.icon" />
    </v-list-item-icon>
    <v-list-item-content>
      <v-text-field
        v-if="edit"
        ref="editInput"
        v-model="title"
        hide-details
        class="pa-0 ma-0"
        @click.stop
        @keyup.enter.stop="onToggleEdit"
      />
      <v-list-item-title
        v-else
        v-text="title"
      />
    </v-list-item-content>

    <v-list-item-action>
      <v-row no-gutters>
        <v-btn
          icon
          @mousedown.stop
          @click.stop="onToggleHiddenClick"
        >
          <v-icon
            :color="`${item.hidden ? 'grey' : 'blue'} lighten-1`"
          >
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @mousedown.stop
          @click.stop="onToggleEdit"
        >
          <v-icon :color="`${item.hidden ? 'grey' : 'blue'} lighten-1`">
            {{
              edit ? "mdi-check" : "mdi-pen"
            }}
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @mousedown.stop
          @click.stop="onRemoveClick"
        >
          <v-icon :color="`red lighten-2`">
            mdi-delete
          </v-icon>
        </v-btn>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
  export default {
    name: 'ItemsTweak',

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    data () {
      return {
        edit: false,
      }
    },

    computed: {
      title: {
        get () {
          return this.item.title
        },
        set (value) {
          this.onValueChange(value)
        },
      },
    },

    methods: {
      onToggleHiddenClick () {
        this.$emit('hidden-click')
      },

      onRemoveClick () {
        this.$emit('remove-click')
      },

      onToggleEdit () {
        this.edit = !this.edit
        if (this.edit) {
          this.$nextTick(() => {
            this.$refs.editInput.$refs.input.focus()
          })
        }
      },

      onValueChange (value) {
        this.$emit('value-change', value)
      },
    },
  }
</script>

<style scoped>
</style>

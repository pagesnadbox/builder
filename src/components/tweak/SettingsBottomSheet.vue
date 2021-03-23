<template>
  <v-bottom-sheet
    v-model="visible"
    :close-on-content-click="false"
    :close-on-click="false"
    scrollable
    offset-overflow
  >
    <v-card
      ref="card"
      style="position: relative; top: -10; left: 0"
      width="400px"
      v-bind="cardProps"
      class="py-2"
    >
      <v-container>
        <v-row
          class="pa-2"
          justify="space-around"
        >
          <v-icon
            :disabled="selected === 2"
            @click="onArrowUpClick"
          >
            mdi-chevron-up
          </v-icon>
          <v-icon
            @click="onResetClick"
          >
            mdi-format-vertical-align-center
          </v-icon>
          <v-icon
            :disabled="selected === 0"
            @click="onArrowDownClick"
          >
            mdi-chevron-down
          </v-icon>
        </v-row>
      </v-container>

      <slot />
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  import SettingsMixin from './settingsMixin'

  export default {
    mixins: [SettingsMixin],

    data () {
      return {
        maxHeight: 50,
        heights: [20, 50, 90],
        selected: 1,
      }
    },

    computed: {
      cardProps () {
        return {
          height: `${this.heights[this.selected]}vh`,
        }
      },
    },

    methods: {
      onArrowUpClick () {
        this.selected++
      },
      onArrowDownClick () {
        this.selected--
      },
      onResetClick () {
        this.selected = 1
      },
    },
  }
</script>

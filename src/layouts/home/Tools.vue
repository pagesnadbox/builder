<template>
  <v-card
    id="settings"
    class="py-2 px-4"
    color="#0000004D"
    dark
    flat
    style="position: fixed; top: 160px; right: -35px"
    width="100"
  >
    <v-icon
      :disabled="!canUndo"
      class="mb-3"
      large
      @click="onUndoClick"
    >
      mdi-undo-variant
    </v-icon>
    <v-icon
      :disabled="!canRedo"
      class="mb-3"
      large
      @click="onRedoClick"
    >
      mdi-redo-variant
    </v-icon>
    <v-icon
      class="mb-3"
      large
      @click="onResetClick"
    >
      mdi-lock-reset
    </v-icon>
    <v-icon
      large
      @click="onDownloadClick"
    >
      mdi-download-box-outline
    </v-icon>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex'
  import { undoRedoHistory } from '../../store'
  import { EventBus } from '../../utils/eventBus'
  import { getData, postData } from '../../utils/helpers'

  export default {
    name: 'HomeTools',

    computed: {
      ...mapState('settings', ['canRedo', 'canUndo']),
    },

    created () {
      EventBus.$on('on-keydown', this.onKeyDown.bind(this))
    },

    methods: {
      // download
      onDownloadClick () {
        postData({
          url: 'https://landingpagebuilder-server-v1.herokuapp.com/v1/api/download/zip',
          payload: window.config,
        })
          .then((response) => response.blob())
          .then((blob) => {
            var url = window.URL.createObjectURL(blob)
            var a = document.createElement('a')
            a.href = url
            a.download = 'dist.zip'
            document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click()
            a.remove() // afterwards we remove the element again
          })
      },
      // history
      onUndoClick () {
        this.undo()
      },
      onRedoClick () {
        this.redo()
      },
      onResetClick () {
        undoRedoHistory.reset()
      },
      undo () {
        if (this.canUndo) {
          undoRedoHistory.undo()
        }
      },
      redo () {
        if (this.canRedo) {
          undoRedoHistory.redo()
        }
      },
      onKeyDown (e) {
        if (e.ctrlKey && e.keyCode === 90) {
          e.shiftKey ? this.redo() : this.undo()
        }
      },
    },
  }
</script>

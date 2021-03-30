<template>
  <v-dialog
    v-model="dialog"
    max-width="1200"
  >
    <v-card
      color="grey lighten-4"
      flat
      tile
    >
      <v-toolbar
        flat
        outlined
      >
        <v-toolbar-title>Gallery</v-toolbar-title>

        <v-spacer />

        <v-btn @click="onUploadClick">
          upload
          <v-icon right>
            mdi-upload
          </v-icon>
        </v-btn>

        <input
          v-show="false"
          ref="upload"
          type="file"
          multiple
          @change="onFilesChange"
        ></input>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <div
          v-if="empty"
          class="text-center py-10"
        >
          No items uploaded
        </div>

        <v-container
          v-else
          fluid
        >
          <v-row>
            <v-col
              v-for="(file, i) in files"
              :key="i"
              class="d-flex child-flex"
              cols="12"
              sm="4"
            >
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 6 : 0"
                    class="mx-auto"
                    @click="onImageClick(file)"
                  >
                    <v-card-title class="text-truncate">
                      {{ file.name }}
                    </v-card-title>
                    <v-img
                      max-height="300"
                      :src="file.url"
                      :lazy-src="file.url"
                      class="grey lighten-2"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          />
                        </v-row>
                      </template>
                    </v-img>
                  </v-card>
                </template>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { EventBus } from '../../utils/eventBus'
  export default {

    data () {
      return {
        files: {},
        empty: true,
      }
    },

    computed: {
      ...mapState('settings', ['showGallery']),

      dialog: {
        get () {
          return this.showGallery
        },
        set (value) {
          this.setShowGallery(value)
        },
      },
    },

    watch: {
      dialog: function (value) {
        if (!value) {
          EventBus.$off('on-img-click')
        }
      },
    },

    methods: {
      ...mapActions('settings', ['setShowGallery']),

      onImageClick (img) {
        EventBus.$emit('on-image-click', img)
      },

      onUploadClick () {
        this.$refs.upload.click()
      },

      onFilesChange (event) {
        const files = event.target.files

        files.forEach(file => {
          if (!this.files[file.name]) {
            const fr = new FileReader()

            fr.addEventListener('load', () => {
              this.empty = false
              this.$set(this.files, file.name, {
                name: file.name,
                file,
                url: fr.result,
              })
            })

            fr.readAsDataURL(file)
          }
        })
      },
    },
  }
</script>

<style scoped></style>

<template>
  <v-dialog
    v-model="dialog"
    max-width="1200"
  >
    <v-card
      flat
      tile
    >
      <v-toolbar
        flat
      >
        <v-toolbar-title>Gallery</v-toolbar-title>

        <v-spacer />

        <v-btn outlined text @click="onUploadClick">
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


      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn          
            class="ml-3" 
            v-bind="attrs"
            v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>Clear</v-list-item-title>
        </v-list-item>
      </v-list>

      </v-menu>

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
                    outlined
                    flat
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
  import { mapActions, mapState } from 'vuex'
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
      ...mapActions("settings", ["setShowGallery"]),
      onImageClick (img) {
        EventBus.$emit('on-image-click', img)
      },

      onUploadClick () {
        this.$refs.upload.click()
      },

      onFilesChange (event) {
        const files = event.target.files
        const loaded = {};

        files.forEach((file, index) => {
          if (!this.files[file.name]) {
            const fr = new FileReader()

            fr.addEventListener('load', () => {
              this.empty = false
              const loadedFile = {
                name: file.name,
                file,
                url: fr.result,
              }

              loaded[file.name] = loadedFile;
              this.$set(this.files, file.name, loadedFile)

              if (index === files.length - 1) {
                this.$emit("files-loaded", loaded)
              }
            })

            fr.readAsDataURL(file)
          }
        });

      },
    },
  }
</script>

<style scoped></style>

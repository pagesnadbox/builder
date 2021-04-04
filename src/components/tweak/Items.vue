<template>
  <v-expansion-panels flat>
    <v-expansion-panel flat>
      <v-expansion-panel-header>
        <v-subheader>COMPONENTS</v-subheader>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="p-0">
        <v-list
          rounded
          transition="scale-transition"
        >
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <draggable v-model="myArray">
              <transition-group>
                <compnent-item
                  v-for="(item, i) in myArray"
                  :editable="editable"
                  :key="i"
                  :item="item"
                  @click="onItemClick(i)"
                  @hidden-click="onValueChange('hidden', i, !item.hidden)"
                  @remove-click="onRemoveClick(i)"
                  @value-change="onValueChange('title', i, $event)"
                />
              </transition-group>
            </draggable>
          </v-list-item-group>
        </v-list>
        <div class="px-2 pt-2" v-if="editable">
          <v-btn
            block
            rounded
            x-large
            depressed
            color="primary"
            dark
            @click="onAddClick"
          >
            add
          </v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
  import draggable from 'vuedraggable'
  import { mapActions } from 'vuex'

  import Item from './Item'

  export default {
    name: 'ItemsTweak',

    components: {
      draggable,
      CompnentItem: Item,
    },

    props: {
      editable: {
        type: Boolean,
        default: false,
      },

      items: {
        type: Array,
        default: () => [],
      },

      region: {
        type: String,
        default: 'app',
      },

      listId: {
        type: String,
        default: '',
      }
    },

    data () {
      return {
        selectedItem: 2,
      }
    },

    computed: {
      myArray: {
        get () {
          return this.items
        },
        set (value) {
          this.$store.dispatch(`${this.region}/setItems`, value)
          this.setItems(value)
        },
      },
    },

    methods: {
      ...mapActions('components', ['setItems']),
      onItemClick (i) {
        this.$emit('item-click', i)
      },
      onValueChange (key, index, value) {
        this.$emit('property-change', {
          apendix: `-items-${index}`,
          id: this.listId,
          key,
          value,
        })
      },
      onRemoveClick (index) {
        this.$emit('remove-click', {
          index,
        })
      },
      onAddClick () {
        this.$emit('add-click')
      },
    },
  }
</script>

<style scoped>
>>> .v-expansion-panel-content__wrap {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>

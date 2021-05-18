<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn block color="primary" v-bind="attrs" v-on="on">
          Add component
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-select
            label="Pick component"
            v-model="selected"
            item-text="displayName"
            item-value="componentName"
            :return-object="false"
            :items="items"
          ></v-select>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="onSaveClick">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      menu: false,
      selected: null
    };
  },

  methods: {
    onSaveClick() {
      this.menu = false;
      this.$emit("save-click", { component: this.selected });
    }
  }
};
</script>

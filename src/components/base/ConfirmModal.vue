<template>
  <v-dialog
    :value="confirm.visibility"
    :fullscreen="confirm.fullscreen"
    class="overflow-hidden"
    persistent
    min-height="800px"
    max-width="500px"
    @change="closeDialog"
  >
    <v-card>
      <v-toolbar :color="color" flat>
        <v-card-title>
          <span class="headline">Message</span>
        </v-card-title>
        <h3 class="display-2 font-weight-regular" />
        <v-spacer />
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="px-5 pt-5 text-center title confirm-massage">
        Are you sure you want to {{ action }} ?
      </v-card-text>

      <v-card-actions class="px-5">
        <v-row>
          <v-col>
            <v-btn
              color="red lighten-1"
              dark
              depressed
              block
              @click="closeDialog"
              >Cancel</v-btn
            >
          </v-col>
          <v-col>
            <v-btn color="primary" dark depressed block @click="onConfirm"
              >Confirm</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      color: state => state.modals.confirm.color,
      action: state => state.modals.confirm.action,
      confirm: state => state.modals.confirm,
      responsive: state => state.layout.responsive
    })
  },

  methods: {
    ...mapActions("modals", ["setFullscreen", "setModalVisibility"]),

    onConfirm() {
      this.confirm.callback();
      this.closeDialog();
    },

    closeDialog() {
      this.setModalVisibility({ key: "confirm", value: false });
    }
  }
};
</script>

<style scoped>
.confirm-massage {
  color: #000000c2;
}

>>> .v-dialog {
  overflow: hidden;
}
</style>

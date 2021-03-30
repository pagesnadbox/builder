import { mapState } from "vuex";
import mixin from "./mixin";

export default {
    mixins: [mixin],

    props: {
      dark: {
        type: Boolean,
        default: false
      },
  
      src: {
        type: String,
        default: ""
      },
      
      srcDark: {
        type: String,
        default: ""
      },
      
      height: {
        type: String,
        default: ""
      },
      
      mobileHeight: {
        type: String,
        default: ""
      }
    },
  
    computed: {
      ...mapState("settings", ["images"]),
  
      effectiveHeight() {
        return this.$vuetify.breakpoint.mdAndUp ? this.height : this.mobileHeight;
      },
  
      source() {
        const isDark = this.dark || this.$vuetify.theme.isDark;
  
        const srcProp = isDark ? "srcDark" : "src";
  
        return (
          this.images[srcProp]?.url ||
          this.images[this.src]?.ur ||
          this[srcProp] || this.src
        );
      }
    }
}
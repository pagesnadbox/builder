import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Store } from './store'
import vuetify from './plugins/vuetify'
import './plugins'

Vue.config.productionTip = false

let config = {
  app: {
    bar: {
      visible: true,
      height: '80',
      dark: false,
      logo: {
        height: '',
        src: './assets/pagelaunchlogo.png',
      },
    },
    footer: {
      visible: true,
    },
    list: {
      items: [
        {
          title: 'Hero',
          componentName: 'BaseImage',
          id: 'hero-img',
          key: 'hero',
        },
        {
          title: 'Theme Features',
          componentName: 'BaseSection',
          id: 'themeFeatures',
          key: 'theme-features',
        },
        {
          componentName: 'BaseSection',
          title: 'Features',
          id: 'features',
          key: 'features',
        },
        {
          title: 'Affiliates',
          componentName: 'BaseSection',
          id: 'affiliates',
          key: 'affiliates',
        },
        {
          componentName: 'BaseSection',
          title: 'Social Media',
          id: 'social',
          key: 'social-media',
        },
      ],
    },
  },
  themeFeatures: {
    color: '#00000000',
    space: '100',
    heading: {
      color: '#00000000',
      title: 'Theme Features',
      align: 'center',
      text: ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, in!
      Asperiores, impedit libero. Veniam rerum saepe unde nihil possimus
      quibusdam esse accusamus mollitia magni fuga.`,
      editableProps: false,
    },
    list: {
      cols: '1',
      md: '2',
      items: [
        {
          componentName: 'BaseAvatarCard',
          outlined: true,
          editableProps: false,
          id: 'themeFeatures-list-items',
          title: 'Pixel Perfect Design',
          icon: 'mdi-fountain-pen-tip',
          align: 'center',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!`,
        },
        {
          title: 'Retina Ready',
          componentName: 'BaseAvatarCard',
          outlined: true,
          editableProps: false,
          id: 'themeFeatures-list-items',
          icon: 'mdi-cellphone',
          align: 'center',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!`,
        },
        {
          color: '#42A5F6',
          dark: true,
          title: 'Easily Customizable',
          componentName: 'BaseAvatarCard',
          outlined: true,
          editableProps: false,
          id: 'themeFeatures-list-items',
          icon: 'mdi-pencil-box-outline',
          align: 'center',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!`,
        },
        {
          title: 'Image Parallax',
          componentName: 'BaseAvatarCard',
          outlined: true,
          editableProps: false,
          id: 'themeFeatures-list-items',
          icon: 'mdi-image-size-select-actual',
          align: 'center',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!`,
        },
        {
          title: 'Seo Optimized',
          componentName: 'BaseAvatarCard',
          outlined: true,
          editableProps: false,
          id: 'themeFeatures-list-items',
          icon: 'mdi-ice-pop',
          align: 'center',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!`,
        },
        {
          title: '24/7 Support',
          componentName: 'BaseAvatarCard',
          outlined: true,
          editableProps: false,
          id: 'themeFeatures-list-items',
          icon: 'mdi-help-circle-outline',
          align: 'center',
          text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            illum veniam cum dolores ratione commodi beatae quas maxime,
            laboriosam excepturi solut!`,
        },
      ],
    },

  },
  hero: {
    img: {
      height: '',
      src: './assets/applemonitor.jpg',
    },
    resizeContainer: {
      dark: true,
      align: 'left',
      maxWidth: '1300px',
    },
    subheading: {
      weight: 'regular',
      title: 'PLACE TO LAUNCH YOUR LANDING PAGE IN A MINUTES',
    },
    heading: {
      size: 'text-h2',
      title: 'WELCOME TO PAGE LAUNCH',
      weight: 'medium',
    },
    body: {
      text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Repudiandae nobis neque aspernatur in quas iure id aliquid, esse
      debitis, quibusdam mollitia! Quia ea expedita magnam totam, earum
      omnis et perspiciatis?`,
    },
    action1: {
      text: 'Discover More',
      depressed: true,
      tile: true,
      color: '#42A5F6',
      target: true,
      size: 'x-large',
    },
    action2: {
      text: 'Get Started Now',
      textOnly: true,
      target: true,
      size: 'normal',
    },
  },
  features: {
    color: '#050B1F',
    space: '',
    dark: true,
    list: {
      cols: '1',
      md: '4',
      items: [
        {
          componentName: 'BaseInfoCard',
          id: 'features-list-items',
          editableProps: false,
          align: 'center',
          icon: 'mdi-keyboard-outline',
          title: 'Trendy Design',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
        {
          componentName: 'BaseInfoCard',
          editableProps: false,
          align: 'center',
          id: 'features-list-items',
          icon: 'mdi-camera-outline',
          title: 'Photography',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
        {
          componentName: 'BaseInfoCard',
          editableProps: false,
          align: 'center',
          id: 'features-list-items',
          icon: 'mdi-pencil-outline',
          title: 'Brand Making',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
        {
          componentName: 'BaseInfoCard',
          editableProps: false,
          align: 'center',
          id: 'features-list-items',
          icon: 'mdi-puzzle-outline',
          title: '24/7 Support',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
      ],
    },
  },
  affiliates: {
    color: '#00000000',
    space: '50',
    heading: {
      title: "Who's using Zero?",
      editableProps: false,
      color: '#00000000',
    },
    list: {
      items: [
        {
          componentName: 'BaseImage',
          id: 'affiliates-list-items',
          src: './assets/logo-1-light.png',
          title: 'Affiliate Name',
          icon: 'mdi-account-convert',
        },
        {
          componentName: 'BaseImage',
          id: 'affiliates-list-items',
          src: './assets/logo-2-light.png',
          title: 'Affiliate Name',
          icon: 'mdi-account-convert',
        },
        {
          componentName: 'BaseImage',
          id: 'affiliates-list-items',
          src: './assets/logo-3-light.png',
          title: 'Affiliate Name',
          icon: 'mdi-account-convert',
        },
        {
          componentName: 'BaseImage',
          id: 'affiliates-list-items',
          src: './assets/logo-4-light.png',
          title: 'Affiliate Name',
          icon: 'mdi-account-convert',
        },
        {
          componentName: 'BaseImage',
          id: 'affiliates-list-items',
          src: './assets/logo-5-light.png',
          title: 'Affiliate Name',
          icon: 'mdi-account-convert',
        },
        {
          componentName: 'BaseImage',
          id: 'affiliates-list-items',
          src: './assets/logo-6-light.png',
          title: 'Affiliate Name',
          icon: 'mdi-account-convert',
        },
      ],
    },

  },
  social: {
    color: '#204165',
    space: '50',
    dark: true,
    heading: {
      editableProps: false,
      color: '#00000000',
      align: 'center',
      title: 'Social Media',
      text: `  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi
      aspernatur recusandae aut repudiandae illo error obcaecati dolores
      voluptate, tempore.`,
    },
    action: {
      text: 'Follow Us',
      openInNewTab: true,
      iconSrc: 'mdi-open-in-new',
      href: 'https://twitter.com/vuetifyjs',
      color: '#fff',
      minWidth: '168',

    },
    link: {
      href: 'https://vuetifyjs.com',
      openInNewTab: true,
      id: 'social-link',
    },
    list: {
      items: [
        {
          id: 'social-list-items',
          componentName: 'BaseIcon',
          icon: 'mdi-twitter',
          title: 'Twitter',
        },
        {
          id: 'social-list-items',
          componentName: 'BaseIcon',
          icon: 'mdi-facebook',
          title: 'Facebook',
        },
        {
          id: 'social-list-items',
          componentName: 'BaseIcon',
          icon: 'mdi-youtube',
          title: 'Youtube',
        },
        {
          id: 'social-list-items',
          componentName: 'BaseIcon',
          icon: 'mdi-google',
          title: 'Google',
        },
        {
          id: 'social-list-items',
          componentName: 'BaseIcon',
          icon: 'mdi-linkedin',
          title: 'Linkedin',
        },
      ],
    },
  },
  footer: {
    body: {
      html: 'Copyright &copy; 2021 Launch Page, LLC',
    },
  },
}

export let store;

(async () => {
  try {
    const data = await fetch('./config.json')
    config = await data.json()
  } catch (e) {
    console.error(e)
  }

  window.config = config

  store = Store(config)

  new Vue({
    router,
    vuetify,
    store: store,
    render: h => h(App),
  }).$mount('#app')
})()

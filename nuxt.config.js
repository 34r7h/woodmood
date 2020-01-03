import colors from 'vuetify/es5/util/colors'

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      {name: 'google-site-verification',content:'Yl7o4EiONrzabXO507C9CdewMhmoFl_uxPXJYDBKtPY'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      'nuxt-fire',
      {
        config: {
          apiKey: "AIzaSyBCQ1zkonw5I5vIV3PKPFh46kARzmYVpXA",
          authDomain: "woodmood-1.firebaseapp.com",
          databaseURL: "https://woodmood-1.firebaseio.com",
          projectId: "woodmood-1",
          storageBucket: "woodmood-1.appspot.com",
          messagingSenderId: "80157869430",
          appId: "1:80157869430:web:1a218362086ff6d933e657",
          measurementId: "G-KL00FLCBRF"
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
        }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#98261E',
          accent: '#C04C28',
          secondary: '#031C6A',
          info: '#F7C732',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#326727'
        },
        light: {
          primary: '#98261E',
          accent: '#C04C28',
          secondary: '#031C6A',
          info: '#F7C732',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#326727'
        },
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    extractCSS: true,
  },
  srcDir: 'src',
  buildDir: 'functions/.nuxt',
  generateDir: 'dist'
}

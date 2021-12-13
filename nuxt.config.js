export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - uap-project-frontend',
    title: 'uap-project-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'https://practicas-fcs.uap.edu.ar/api'
    // baseUrl: 'http://localhost:1337'
  },
  // router: {
  //   middleware: ['auth']
  // },

  auth: {
    redirect: {
      login: '/',
      logout: '/',
      home: '/patients'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          autoFetch: false
        },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: false // { url: '/users/me', method: 'get' }
        }
      }
    },
    plugins: [
      { src: "~/plugins/axios", mode: "client" },
      { src: "~/plugins/auth", mode: "client" }
    ]

  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: { variations: false },
      themes: {
        light: {
          primary: '#043353',
          accent: '#ED6767',
          secondary: '#020314',
          tertiary: '#D3DDE6',
          quaternary: '#e4e8eb',
        },
        dark: {
          primary: '#D3DDE6', // #043353
          accent: '#ED6767',
          secondary: '#FAF8F0',
          tertiary: '#D3DDE6',
          quaternary: '#020314',
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true
  }
}

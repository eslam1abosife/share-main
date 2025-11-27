export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: [
    '@fortawesome/fontawesome-free/css/all.min.css', // تضمين Font Awesome
    '@/assets/main.css', // ملف Tailwind
    'vuetify/styles',    // إضافة أنماط Vuetify
    '@mdi/font/css/materialdesignicons.css', // دعم أيقونات Material Design
    'simplebar/dist/simplebar.css',
    '@/assets/styles.css'
  ],

  modules: ['@nuxtjs/google-fonts'],
  pages: true,
components: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: [
    { src: '~/plugins/tamkinLibrary.js', mode: 'client' }, 
  ], 

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },

  ssr: false, 
});

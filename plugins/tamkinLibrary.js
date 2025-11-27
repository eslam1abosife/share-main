import VTamkinVideoPlayer from "/tamkin-library/src/VTamkinPlayer.vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VTamkinVideoPlayer);
});

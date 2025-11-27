<template>
  <div class="p-6 cons-tiks">
    <v-container class="con-tik">
      <div v-if="isLoading" class="loading-container">
        <v-progress-circular
          indeterminate
          color="rgb(6, 129, 119)"
          size="64"
          width="6"
        ></v-progress-circular>
      </div>

      <v-row v-else>
        <v-col class="col-margin">
          <div class="content-large">
            <h1>
              <span class="gradient-text">Explore and Watch Now</span>
              - Enjoy Your Shared
            </h1>
            <h1>Content and Engage with Others</h1>
          </div>
          <div class="content-small">
            <h1>
              <span class="gradient-text">Enjoy Your Shared Content</span>
            </h1>
            <h1>and Engage with Others</h1>
          </div>
        </v-col>
      </v-row>

      <div class="card-container">
        <v-row>
          <v-col cols="10">
            <div class="flex-container">
              <div>
                <img
                  class="user-image"
                  :src="
                    projectData.user_image
                      ? projectData.user_image
                      : '/image%201.png'
                  "
                />
              </div>
              <div class="ml-3">
                <h2 class="h2-tit">{{ projectData.project_title }}</h2>
                <span class="spa-tit">
                  <span>{{ projectData.type }}</span> Shared by
                  <span>{{ projectData.owner }}</span>
                </span>
              </div>
            </div>
          </v-col>

          <v-col cols="2" class="flex justify-end">
            <div class="text-end">
              <div class="content-large">
                <div
                  class="svg-hov button-container"
                  @click="showDialog = true"
                >
                  <ShowDialog />
                </div>
              </div>
              <div class="content-small">
                <div
                  class="svg-hov button-container"
                  @click="showDialog = true"
                >
                  <ShowDialogsmall />
                </div>
              </div>

              <ShareDialog
                v-model="showDialog"
                :projectData="projectData"
                :dialogMaxWidth="dialogMaxWidth"
                :cardHeight="cardHeight"
                :isSmallScreen="isSmallScreen"
                :dialogContentClass="dialogContentClass"
                @copy-to-clipboard="copyToClipboard"
              />
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div
              class="media-container"
              :class="{ 'custom-fullscreen': isCustomFullscreen }"
              ref="fullscreenWrapper"
            >
              <!-- الفيديو الواحد فقط -->
              <MediaDisplay
                :projectData="projectData"
                :subtitleTrackSrc="subtitleTrackSrc"
                :isCharacterLoaded="isCharacterLoaded"
                :videoPlayer="videoPlayer"
                :textTrack="textTrack"
                :isFullscreenExternal="isCustomFullscreen"
                :fullscreenWrapper="fullscreenWrapper"
                @video-play="onVideoPlay"
                @trigger-ad-animation="handleTriggerAdAnimation"
                @animation-queue-complete="handleAnimationComplete"
                @reset-character="handleResetCharacter"
                @toggle-custom-fullscreen="toggleCustomFullscreen"
                class="main-media-display"
                ref="mediaDisplayRef"
              />

              <!-- الكاركتر الواحد - يتكيف مع الوضعين -->
              <div
                v-show="!lottieInstance"
                class="character-container"
                :class="{
                  'character-normal': !isCustomFullscreen,
                  'character-fullscreen': isCustomFullscreen,
                }"
              >
                <CharacterViewer
                  :projectData="projectData"
                  :charWidth="currentCharWidth"
                  :charHeight="currentCharHeight"
                  :isCharacterLoaded="isCharacterLoaded"
                  :lottieInstance="lottieInstance"
                  @character-loaded="onCharacterLoaded"
                  class="single-character"
                />
              </div>

              <!-- زر الإغلاق في Fullscreen -->
              <button
                v-if="isCustomFullscreen"
                class="fullscreen-exit-btn"
                @click="toggleCustomFullscreen"
                @keydown.enter="toggleCustomFullscreen"
                tabindex="0"
              >
                <v-icon size="24">mdi-fullscreen-exit</v-icon>
                <span class="sr-only">خروج من الشاشة الكاملة</span>
              </button>

              <!-- Overlay للإغلاق عند الضغط خارج المحتوى -->
              <div
                v-if="isCustomFullscreen"
                @click="toggleCustomFullscreen"
              ></div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-container class="con-tik" v-if="!isLoading">
      <v-row>
        <v-col class="col-med">
          <div class="tamkin-container">
            <div>
              <Tamkinicon />
            </div>
            <div class="content-large">
              <h2 class="cou-tit" id="pdfFrame" @mouseup="setupTextSelection">
                communicate effortlessly—download
                <span class="tamkin-bold">Tamkin</span>
                now and explore the world of sign language!
              </h2>
            </div>
            <div class="content-small">
              <h2 class="cou-tit-small">
                communicate effortlessly—download
                <span class="tamkin-bold-small">Tamkin</span>
                now and explore the world of sign language!
              </h2>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="content-large">
            <div class="app-links">
              <a :href="appLinks.google_play" target="_blank">
                <PlayIcon />
              </a>
              <div class="ml-3">
                <a :href="appLinks.app_store" target="_blank">
                  <Appstore />
                </a>
              </div>
            </div>
          </div>
          <div class="content-small">
            <div class="app-links">
              <a :href="appLinks.google_play" target="_blank">
                <Playsmall />
              </a>
              <div class="ml-3">
                <a :href="appLinks.app_store" target="_blank">
                  <Storesmall />
                </a>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, watch, computed } from "vue";
import lottie from "lottie-web";
import animationData from "@/pages/handload[1].json";

import ShareDialog from "@/components/embedcomponent/ShareDialog.vue";
import MediaDisplay from "@/components/embedcomponent/MediaDisplay.vue";
import CharacterViewer from "@/components/embedcomponent/CharacterViewer.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import InstagramIcon from "@/components/icons/InstagramIcon.vue";
import TikTokIcon from "@/components/icons/TikTokIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon.vue";
import YouTubeIcon from "@/components/icons/YouTubeIcon.vue";
import TelegramIcon from "@/components/icons/TelegramIcon.vue";
import PinterestIcon from "@/components/icons/PinterestIcon.vue";
import MessengerIcon from "@/components/icons/MessengerIcon.vue";
import SnapchatIcon from "@/components/icons/SnapchatIcon.vue";
import RedditIcon from "@/components/icons/RedditIcon.vue";
import ThreadsIcon from "@/components/icons/ThreadsIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import DiscordIcon from "@/components/icons/DiscordIcon.vue";
import TumblrIcon from "@/components/icons/TumblrIcon.vue";
import PlayIcon from "@/components/icons/googleplayIcon.vue";
import Appstore from "@/components/icons/appstore.vue";
import Playsmall from "@/components/icons/playsmall.vue";
import Storesmall from "@/components/icons/storesmall.vue";
import ShowDialog from "@/components/icons/showDialog.vue";
import ShowDialogsmall from "@/components/icons/showDialogsmall.vue";
import CopyToClipboardicon from "@/components/icons/copyToClipboardicon.vue";
import TriggerAdAnimation4icon from "@/components/icons/triggerAdAnimation4icon.vue";
import TriggerAdAnimation2 from "@/components/icons/triggerAdAnimation2.vue";
import Tamkinicon from "@/components/icons/tamkinicon.vue";

interface ProjectData {
  subtitle?: string;
  text?: string;
  type?: string;
  share_link?: string;
  project_link?: string;
  project_title?: string;
  owner?: string;
  character?: string;
  user_image?: string;
}

interface AppLinks {
  [key: string]: string;
}

interface AnimationData {
  text: string;
  duration: number;
}

interface Window {
  getAdAnimate?: (text: string, value: number) => Promise<void>;
  character?: any;
  loadedByName?: any;
  adjustCameraBasedOnCharacter?: (
    arg1: number,
    width: number,
    height: number
  ) => void;
  caches?: {
    open: (name: string) => Promise<{
      put: () => Promise<void>;
      match: () => Promise<null>;
    }>;
  };
  loaded?: boolean;
}

export default defineComponent({
  components: {
    ShareDialog,
    MediaDisplay,
    CharacterViewer,
    FacebookIcon,
    InstagramIcon,
    TikTokIcon,
    TwitterIcon,
    WhatsAppIcon,
    YouTubeIcon,
    TelegramIcon,
    PinterestIcon,
    MessengerIcon,
    SnapchatIcon,
    RedditIcon,
    ThreadsIcon,
    LinkedInIcon,
    DiscordIcon,
    TumblrIcon,
    PlayIcon,
    Appstore,
    Playsmall,
    Storesmall,
    ShowDialog,
    ShowDialogsmall,
    CopyToClipboardicon,
    TriggerAdAnimation4icon,
    TriggerAdAnimation2,
    Tamkinicon,
  },
  setup() {
    const showDialog = ref<boolean>(false);
    const isLoading = ref<boolean>(true);
    const projectData = ref<ProjectData>({});
    const subtitleTrackSrc = ref<string | null>(null);
    const charWidth = ref<number>(249);
    const charHeight = ref<number>(338);
    const isCharacterLoaded = ref<boolean>(false);
    const appLinks = ref<AppLinks>({});
    const projectId = ref<string>("");
    const lottieInstance = ref<any>(null);
    const videoPlayer = ref<HTMLVideoElement | null>(null);
    const textTrack = ref<TextTrack | null>(null);
    const screenWidth = ref<number>(window.innerWidth);
    const isCustomFullscreen = ref(false);
    const fullscreenWrapper = ref<HTMLElement | null>(null);
    const mediaDisplayRef = ref<any>(null);

    // Computed لأبعاد الكاركتر حسب الوضع
    const currentCharWidth = computed(() => {
      return isCustomFullscreen.value ? charWidth.value : charWidth.value;
    });

    const currentCharHeight = computed(() => {
      return isCustomFullscreen.value ? charHeight.value : charHeight.value;
    });

    return {
      showDialog,
      isLoading,
      projectData,
      subtitleTrackSrc,
      charWidth,
      charHeight,
      currentCharWidth,
      currentCharHeight,
      isCharacterLoaded,
      appLinks,
      projectId,
      lottieInstance,
      videoPlayer,
      textTrack,
      screenWidth,
      isCustomFullscreen,
      fullscreenWrapper,
      mediaDisplayRef,
    };
  },
  methods: {
    async toggleCustomFullscreen() {
      this.isCustomFullscreen = !this.isCustomFullscreen;

      await nextTick();

      if (this.fullscreenWrapper) {
        if (this.isCustomFullscreen) {
          // Fullscreen Mode
          this.fullscreenWrapper.style.position = "fixed";
          this.fullscreenWrapper.style.top = "0";
          this.fullscreenWrapper.style.left = "0";
          this.fullscreenWrapper.style.width = "100vw";
          this.fullscreenWrapper.style.height = "100vh";
          this.fullscreenWrapper.style.zIndex = "9999";
          this.fullscreenWrapper.style.background = "black";
          this.fullscreenWrapper.style.overflow = "hidden";

          document.body.style.overflow = "hidden";
          document.body.style.margin = "0";
          document.body.style.padding = "0";

          window.scrollTo(0, 0);

          // تحديث أبعاد الكاركتر في الـ fullscreen
          if (window.adjustCameraBasedOnCharacter) {
            window.adjustCameraBasedOnCharacter(
              1,
              this.currentCharWidth,
              this.currentCharHeight
            );
          }

          await nextTick();
          const video = this.$el.querySelector("video") as HTMLVideoElement;
          if (video && video.paused) {
            try {
              await video.play();
            } catch (error) {
              console.error("فشل تشغيل الفيديو:", error);
            }
          }
        } else {
          // Normal Mode
          this.fullscreenWrapper.style.position = "";
          this.fullscreenWrapper.style.top = "";
          this.fullscreenWrapper.style.left = "";
          this.fullscreenWrapper.style.width = "";
          this.fullscreenWrapper.style.height = "";
          this.fullscreenWrapper.style.zIndex = "";
          this.fullscreenWrapper.style.background = "";
          this.fullscreenWrapper.style.overflow = "";

          document.body.style.overflow = "";
          document.body.style.margin = "";
          document.body.style.padding = "";

          if (window.adjustCameraBasedOnCharacter) {
            window.adjustCameraBasedOnCharacter(
              1,
              this.charWidth,
              this.charHeight
            );
          }
        }
      }
    },

    async fetchProjectData() {
      try {
        this.projectId = this.$route.params.id as string;
        const response = await fetch(
          `https://api.tamkin.app/v1/api/mobile/shareproject/${this.projectId}`
        );
        const result = await response.json();
        if (result.statusCode === 200 && result.succeeded) {
          this.projectData = result.data;
          this.loadSubtitle();
          this.loadfares();
        } else {
          this.$router.push({ name: "notFound2" });
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات المشروع:", error);
        this.$router.push({ name: "notFound2" });
      } finally {
        this.isLoading = false;
      }
    },

    async loadSubtitle() {
      if (!this.projectData.subtitle) {
        if (this.projectData.text) {
          const fallbackVtt = this.convertTextToSimpleVtt(
            this.projectData.text
          );
          this.subtitleTrackSrc = URL.createObjectURL(
            new Blob([fallbackVtt], { type: "text/vtt" })
          );
        } else {
          this.subtitleTrackSrc = null;
        }
        return;
      }
      try {
        const response = await fetch(this.projectData.subtitle);
        if (!response.ok) {
          throw new Error(`فشل تحميل الترجمة: ${response.status}`);
        }
        let text = await response.text();
        let vttText = text;
        if (!this.isValidVtt(text)) {
          const convertedVtt = this.convertSrtToVtt(text);
          if (convertedVtt) {
            vttText = convertedVtt;
          } else {
            throw new Error("تنسيق الترجمة غير صالح");
          }
        }
        const blob = new Blob([vttText], { type: "text/vtt" });
        this.subtitleTrackSrc = URL.createObjectURL(blob);
      } catch (error) {
        console.error("خطأ في تحميل الترجمة:", error);
        if (this.projectData.text) {
          const fallbackVtt = this.convertTextToSimpleVtt(
            this.projectData.text
          );
          this.subtitleTrackSrc = URL.createObjectURL(
            new Blob([fallbackVtt], { type: "text/vtt" })
          );
        } else {
          this.subtitleTrackSrc = null;
        }
      }
    },

    isValidVtt(text: string): boolean {
      const vttRegex = /^WEBVTT\s*(\r\n|\r|\n)/i;
      return vttRegex.test(text);
    },

    convertSrtToVtt(srtText: string): string | null {
      if (!srtText) return null;
      const srtBlocks = srtText
        .split(/\r?\n\r?\n/)
        .map((block) => {
          const lines = block.trim().split(/\r?\n/);
          if (lines.length < 3) return null;
          const text = lines.slice(2).join("\n");
          const timestamp = lines[1].replace(",", ".");
          return `${timestamp}\n${text}\n`;
        })
        .filter(Boolean)
        .join("\n\n");
      return `WEBVTT\n\n${srtBlocks}`;
    },

    convertTextToSimpleVtt(text: string): string {
      if (!text) return "";
      const lines = text.split(/\r?\n/).filter((line) => line.trim());
      let vtt = "WEBVTT\n\n";
      let time = 0;
      lines.forEach((line) => {
        const start = this.formatTime(time);
        const end = this.formatTime(time + 5);
        vtt += `${start} --> ${end}\n${line}\n\n`;
        time += 5;
      });
      return vtt;
    },

    formatTime(seconds: number): string {
      const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
      const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${hrs}:${mins}:${secs}.000`;
    },

    handleTriggerAdAnimation(animationData: AnimationData) {
      const event = new CustomEvent("trigger-ad-animation", {
        detail: animationData,
      });
      window.dispatchEvent(event);
    },

    handleAnimationComplete() {},

    handleResetCharacter() {
      window.dispatchEvent(new Event("reset-character"));
    },

    onCharacterLoaded() {
      this.isCharacterLoaded = true;
    },

    async loadfares() {
      try {
        const loadRuntime = this.loadScript(
          "https://cdn.tamkin.app/runtime.js"
        );
        const loadAppJs = this.loadScript("https://cdn.tamkin.app/app.js");
        const loadAppCss = this.loadCSS("https://cdn.tamkin.app/app.css");
        await Promise.all([loadRuntime, loadAppJs, loadAppCss]);

        let attempts = 0;
        const maxAttempts = 50;
        while (!window.character && attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          attempts++;
        }

        if (
          !window.loadedByName ||
          !window.adjustCameraBasedOnCharacter ||
          !window.caches ||
          !window.character
        ) {
          throw new Error("Tamkin SDK غير محمل بالكامل");
        }

        if (this.projectData.character && window.loadedByName) {
          const isLoaded = window.loadedByName(this.projectData.character);
          if (isLoaded) {
            this.isCharacterLoaded = true;
          } else {
            window.addEventListener("loaChar", () => {
              if (window.loaChar === 1) {
                this.isCharacterLoaded = true;
              }
            });
          }
        }

        this.setDimensions();
      } catch (err) {
        console.error("خطأ في تحميل Tamkin SDK:", err);
      }
    },

    loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`فشل تحميل السكربت: ${src}`));
        document.body.appendChild(script);
      });
    },

    loadCSS(href: string): Promise<void> {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) return resolve();
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.crossOrigin = "anonymous";
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`فشل تحميل CSS: ${href}`));
        document.head.appendChild(link);
      });
    },

    setDimensions() {
      if (window.adjustCameraBasedOnCharacter) {
        window.adjustCameraBasedOnCharacter(1, this.charWidth, this.charHeight);
      }
    },

    async fetchAppLinks() {
      try {
        const response = await fetch(
          "https://api.tamkin.app/v1/api/Mobile/shareProjectLinks"
        );
        const result = await response.json();
        if (result.statusCode === 200 && result.succeeded) {
          this.appLinks = result.data;
        }
      } catch (error) {
        console.error("خطأ في جلب روابط التطبيقات:", error);
      }
    },

    copyToClipboard(text: string) {
      if (text) {
        navigator.clipboard
          .writeText(text)
          .then(() => {})
          .catch(() => {});
      } else {
        alert("لا يوجد نص للنسخ!");
      }
    },

    setupTextSelection() {},

    async checkCharacterLoaded() {
      const checkInterval = 100;
      const maxAttempts = 1000;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const tamkinCharacter = document.querySelector("tamkin-sdk-character");
        if (window.loaded && tamkinCharacter) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          this.isCharacterLoaded = true;
          this.isLoading = false;
          if (this.lottieInstance) {
            this.lottieInstance.destroy();
            this.lottieInstance = false;
          }
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, checkInterval));
      }
    },

    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },

    onVideoPlay() {
       window.changeSpeed(3);
    },
  },

  computed: {
    isSmallScreen(): boolean {
      return this.screenWidth <= 768;
    },
    cardHeight(): string {
      return this.isSmallScreen
        ? "auto"
        : this.screenWidth > 1024
        ? "374px"
        : "300px";
    },
    dialogMaxWidth(): string {
      return this.isSmallScreen
        ? "100%"
        : this.screenWidth > 1024
        ? "640px"
        : "640px";
    },
    dialogContentClass(): string {
      return this.isSmallScreen ? "dialog-small-screen" : "";
    },
  },

  watch: {
    isCustomFullscreen(newVal) {
      if (window.adjustCameraBasedOnCharacter) {
        const width = newVal ? this.currentCharWidth : this.charWidth;
        const height = newVal ? this.currentCharHeight : this.charHeight;
        window.adjustCameraBasedOnCharacter(1, width, height);
      }
    },
  },

  async mounted() {
    if (typeof window !== "undefined" && !window.caches) {
      window.caches = {
        open: async () => ({
          put: () => Promise.resolve(),
          match: () => Promise.resolve(null),
        }),
      };
    }

    this.lottieInstance = lottie.loadAnimation({
      container: document.getElementById("loading-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    window.addEventListener("resize", this.updateScreenWidth);

    await this.fetchProjectData();
    await this.fetchAppLinks();
    await this.loadfares();
    this.checkCharacterLoaded();

    const checkInterval = setInterval(() => {
      if (this.isCharacterLoaded && this.subtitleTrackSrc && !this.isLoading) {
        clearInterval(checkInterval);
        const videoElement = document.querySelector(
          "video"
        ) as HTMLVideoElement;
        if (videoElement) {
          this.videoPlayer = videoElement;
          const trackElement = videoElement.querySelector("track");
          if (trackElement) {
            this.textTrack = (trackElement as HTMLTrackElement).track;
            if (this.textTrack) {
              this.textTrack.mode = "showing";
            }
          }
        }
      }
    }, 1000);

    window.addEventListener("loaChar", () => {
      if (window.loaChar === 1) {
        this.isCharacterLoaded = true;
        if (window.adjustCameraBasedOnCharacter) {
          window.adjustCameraBasedOnCharacter(
            1,
            this.charWidth,
            this.charHeight
          );
        }

        let speedAttempts = 0;
        const maxSpeedAttempts = 200;
        const checkActionInterval = setInterval(() => {
          if (
            window.action &&
            typeof window.action.timeScale !== "undefined" &&
            window.changeSpeed
          ) {
            clearInterval(checkActionInterval);
            window.changeSpeed(3);
          } else if (speedAttempts > maxSpeedAttempts) {
            clearInterval(checkActionInterval);
          }
          speedAttempts++;
        }, 100);
      }
    });

    window.addEventListener(
      "animation-queue-complete",
      this.handleAnimationComplete
    );
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
    if (this.textTrack) {
      this.textTrack.mode = "disabled";
    }
    if (this.lottieInstance) {
      this.lottieInstance.destroy();
    }
    window.removeEventListener("loaChar", () => {});
    window.removeEventListener(
      "animation-queue-complete",
      this.handleAnimationComplete
    );
    window.removeEventListener("reset-character", () => {});
    window.removeEventListener("trigger-ad-animation", () => {});

    document.body.style.overflow = "";
    document.body.style.margin = "";
    document.body.style.padding = "";

    if (window.adjustCameraBasedOnCharacter) {
      window.adjustCameraBasedOnCharacter(1, this.charWidth, this.charHeight);
    }
  },
});
</script>

<style scoped>
@import "../../assets/styles.css";

.media-container {
  position: relative;
  width: 100%;
  min-height: 400px;
}

.custom-fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999 !important;
  background: black !important;
  overflow: hidden !important;
}

.main-media-display {
  width: 100% !important;
  height: 100% !important;
  position: relative !important;
  z-index: 1 !important;
}

.main-media-display .media-video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important;
  background: black !important;
}

/* الكاركتر الواحد - الـ Container الرئيسي */
.character-container {
  position: absolute;
  z-index: 10;
  transition: all 0.3s ease-in-out;
  opacity: 1;
}

/* وضع الكاركتر العادي */
.character-normal {
  top: 5px;
  right: 0;
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-normal .single-character {
  width: 100%;
  height: auto;
  max-height: 100%;
}

.character-fullscreen {
  bottom: 0vh;
  right: -5vw;
  width: 20vw;
  height: auto;
  max-width: 300px;
}

.character-fullscreen .single-character {
  width: 100% !important;
  height: auto !important;
}

.fullscreen-exit-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.fullscreen-exit-btn:hover {
  background: rgba(0, 0, 0, 1);
}

.fullscreen-exit-btn:focus {
  outline: 2px solid #068177;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.fullscreen-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: transparent;
}

.custom-fullscreen .custom-video-controls {
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(0, 0, 0, 0.8) !important;
  padding: 20px !important;
  z-index: 20 !important;
}

.custom-fullscreen video::-webkit-media-controls,
.custom-fullscreen video::-webkit-media-controls-panel,
.custom-fullscreen video::-webkit-media-controls-enclosure {
  display: none !important;
}

@media (max-width: 768px) {
  .character-fullscreen {
    bottom: 0vh;
    right: -5vw;
    width: 30vw;
    max-width: 200px;
  }

  .fullscreen-exit-btn {
    top: 15px;
    right: 15px;
    width: 45px;
    height: 45px;
  }

  .character-normal {
    width: 100%;
    position: relative;
  }
  .media-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .video-wrapper {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .fullscreen-exit-btn {
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
  }

  .character-fullscreen {
    bottom: 10vh;
    width: 35vw;
  }
}
@media (max-width: 480px) {
  .character-fullscreen {
    bottom: 0vh;
    width: 35vw;
  }
}
</style>

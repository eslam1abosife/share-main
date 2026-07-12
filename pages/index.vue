<template>
  <div class="p-6 cons-tiks">
    <v-container class="con-tik">
      <!-- شاشة التحميل -->
      <div v-if="isLoading" class="loading-container">
        <v-progress-circular
          indeterminate
          color="rgb(6, 129, 119)"
          size="64"
          width="6"
        ></v-progress-circular>
      </div>

      <!-- المحتوى الرئيسي -->
      <template v-else>
        <!-- قسم البطل -->
        <v-row>
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

        <!-- بطاقة المحتوى -->
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

          <!-- حاوية الوسائط -->
          <v-row>
            <v-col>
              <div
                class="media-container"
                :class="{ 'custom-fullscreen': isCustomFullscreen }"
                ref="fullscreenWrapper"
              >
                <!-- الفيديو -->
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

                <!-- الشخصية -->
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

                <!-- زر الخروج من Fullscreen -->
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

                <!-- Overlay للإغلاق -->
                <div
                  v-if="isCustomFullscreen"
                  @click="toggleCustomFullscreen"
                ></div>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- 🚀 الأزرار الجديدة للتنقل بين الصفحات -->
        <!-- <v-row class="mt-4">
          <v-col cols="12" class="d-flex justify-center gap-4">
            <v-btn
              color="#068177"
              size="large"
              class="nav-btn"
              @click="navigateToPage1"
            >
              <v-icon left>mdi-account-group</v-icon>
              صفحة العرض الأولى
            </v-btn>

            <v-btn
              color="#0ab5a8"
              size="large"
              class="nav-btn"
              @click="navigateToPage2"
            >
              <v-icon left>mdi-video-box</v-icon>
              صفحة العرض الثانية
            </v-btn>
          </v-col>
        </v-row> -->

        <!-- قسم تمكين -->
        <v-container class="con-tik" v-if="!isLoading">
          <v-row>
            <v-col class="col-med">
              <div class="tamkin-container">
                <div>
                  <Tamkinicon />
                </div>
                <div class="content-large">
                  <h2
                    class="cou-tit"
                    id="pdfFrame"
                    @mouseup="setupTextSelection"
                  >
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

          <!-- روابط التطبيقات -->
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
      </template>
    </v-container>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  nextTick,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useRouter } from "vue-router";
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
    height: number,
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
  name: "IndexPage",

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
    const router = useRouter();

    // ===================== الحالة =====================
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
    const screenWidth = ref<number>(
      typeof window !== "undefined" ? window.innerWidth : 0,
    );
    const isCustomFullscreen = ref(false);
    const fullscreenWrapper = ref<HTMLElement | null>(null);
    const mediaDisplayRef = ref<any>(null);

    // ===================== دوال التنقل =====================
    const navigateToPage1 = () => {
      router.push({ name: "text" });
    };

    const navigateToPage2 = () => {
      router.push({ name: "embed" });
    };

    // ===================== استخدام بيانات وهمية =====================
    const useMockData = () => {
      projectData.value = {
        project_title: "مشروع تمكين التفاعلي",
        type: "Text",
        owner: "تمكين",
        user_image: "/image%201.png",
        text: "مرحباً بك في تمكين\nمنصة المحتوى التفاعلي\nاستمتع بالمشاهدة والتفاعل\nشارك إبداعاتك مع الآخرين",
        share_link: window.location.href,
        character: "default",
        subtitle: null,
      };
      loadSubtitle();
      loadfares();
      console.log("✅ تم تحميل البيانات الوهمية بنجاح");
    };

    // ===================== Computed =====================
    const currentCharWidth = computed(() => {
      return isCustomFullscreen.value ? charWidth.value : charWidth.value;
    });

    const currentCharHeight = computed(() => {
      return isCustomFullscreen.value ? charHeight.value : charHeight.value;
    });

    const isSmallScreen = computed(() => {
      return screenWidth.value <= 768;
    });

    const cardHeight = computed(() => {
      return isSmallScreen.value
        ? "auto"
        : screenWidth.value > 1024
        ? "374px"
        : "300px";
    });

    const dialogMaxWidth = computed(() => {
      return isSmallScreen.value
        ? "100%"
        : screenWidth.value > 1024
        ? "640px"
        : "640px";
    });

    const dialogContentClass = computed(() => {
      return isSmallScreen.value ? "dialog-small-screen" : "";
    });

    // ===================== دوال =====================
    const toggleCustomFullscreen = async () => {
      isCustomFullscreen.value = !isCustomFullscreen.value;

      await nextTick();

      if (fullscreenWrapper.value) {
        if (isCustomFullscreen.value) {
          fullscreenWrapper.value.style.position = "fixed";
          fullscreenWrapper.value.style.top = "0";
          fullscreenWrapper.value.style.left = "0";
          fullscreenWrapper.value.style.width = "100vw";
          fullscreenWrapper.value.style.height = "100vh";
          fullscreenWrapper.value.style.zIndex = "9999";
          fullscreenWrapper.value.style.background = "black";
          fullscreenWrapper.value.style.overflow = "hidden";

          document.body.style.overflow = "hidden";
          document.body.style.margin = "0";
          document.body.style.padding = "0";

          window.scrollTo(0, 0);

          if (window.adjustCameraBasedOnCharacter) {
            window.adjustCameraBasedOnCharacter(
              1,
              currentCharWidth.value,
              currentCharHeight.value,
            );
          }

          await nextTick();
          const video = document.querySelector("video") as HTMLVideoElement;
          if (video && video.paused) {
            try {
              await video.play();
            } catch (error) {
              console.error("فشل تشغيل الفيديو:", error);
            }
          }
        } else {
          fullscreenWrapper.value.style.position = "";
          fullscreenWrapper.value.style.top = "";
          fullscreenWrapper.value.style.left = "";
          fullscreenWrapper.value.style.width = "";
          fullscreenWrapper.value.style.height = "";
          fullscreenWrapper.value.style.zIndex = "";
          fullscreenWrapper.value.style.background = "";
          fullscreenWrapper.value.style.overflow = "";

          document.body.style.overflow = "";
          document.body.style.margin = "";
          document.body.style.padding = "";

          if (window.adjustCameraBasedOnCharacter) {
            window.adjustCameraBasedOnCharacter(
              1,
              charWidth.value,
              charHeight.value,
            );
          }
        }
      }
    };

    const fetchProjectData = async () => {
      try {
        // الحصول على ID من الرابط
        const id = router.currentRoute.value.params.id as string;
        projectId.value = id || "default";

        const response = await fetch(
          `https://api.tamkin.app/v1/api/mobile/shareproject/${projectId.value}`,
        );
        const result = await response.json();

        if (result.statusCode === 200 && result.succeeded && result.data) {
          projectData.value = result.data;
          loadSubtitle();
          loadfares();
          console.log("✅ تم جلب البيانات بنجاح:", projectData.value);
        } else {
          console.warn("⚠️ لم يتم العثور على البيانات، استخدام بيانات وهمية");
          useMockData();
        }
      } catch (error) {
        console.error("❌ خطأ في جلب البيانات:", error);
        useMockData();
      } finally {
        isLoading.value = false;
      }
    };

    const loadSubtitle = async () => {
      if (!projectData.value.subtitle) {
        if (projectData.value.text) {
          const fallbackVtt = convertTextToSimpleVtt(projectData.value.text);
          subtitleTrackSrc.value = URL.createObjectURL(
            new Blob([fallbackVtt], { type: "text/vtt" }),
          );
        } else {
          subtitleTrackSrc.value = null;
        }
        return;
      }
      try {
        const response = await fetch(projectData.value.subtitle);
        if (!response.ok) {
          throw new Error(`فشل تحميل الترجمة: ${response.status}`);
        }
        let text = await response.text();
        let vttText = text;
        if (!isValidVtt(text)) {
          const convertedVtt = convertSrtToVtt(text);
          if (convertedVtt) {
            vttText = convertedVtt;
          } else {
            throw new Error("تنسيق الترجمة غير صالح");
          }
        }
        const blob = new Blob([vttText], { type: "text/vtt" });
        subtitleTrackSrc.value = URL.createObjectURL(blob);
      } catch (error) {
        console.error("خطأ في تحميل الترجمة:", error);
        if (projectData.value.text) {
          const fallbackVtt = convertTextToSimpleVtt(projectData.value.text);
          subtitleTrackSrc.value = URL.createObjectURL(
            new Blob([fallbackVtt], { type: "text/vtt" }),
          );
        } else {
          subtitleTrackSrc.value = null;
        }
      }
    };

    const isValidVtt = (text: string): boolean => {
      const vttRegex = /^WEBVTT\s*(\r\n|\r|\n)/i;
      return vttRegex.test(text);
    };

    const convertSrtToVtt = (srtText: string): string | null => {
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
    };

    const convertTextToSimpleVtt = (text: string): string => {
      if (!text) return "";
      const lines = text.split(/\r?\n/).filter((line) => line.trim());
      let vtt = "WEBVTT\n\n";
      let time = 0;
      lines.forEach((line) => {
        const start = formatTime(time);
        const end = formatTime(time + 5);
        vtt += `${start} --> ${end}\n${line}\n\n`;
        time += 5;
      });
      return vtt;
    };

    const formatTime = (seconds: number): string => {
      const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
      const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${hrs}:${mins}:${secs}.000`;
    };

    const handleTriggerAdAnimation = (animationData: AnimationData) => {
      const event = new CustomEvent("trigger-ad-animation", {
        detail: animationData,
      });
      window.dispatchEvent(event);
    };

    const handleAnimationComplete = () => {};

    const handleResetCharacter = () => {
      window.dispatchEvent(new Event("reset-character"));
    };

    const onCharacterLoaded = () => {
      isCharacterLoaded.value = true;
    };

    const loadfares = async () => {
      try {
        const loadRuntime = loadScript("https://cdn.tamkin.app/runtime.js");
        const loadAppJs = loadScript("https://cdn.tamkin.app/app.js");
        const loadAppCss = loadCSS("https://cdn.tamkin.app/app.css");
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

        if (projectData.value.character && window.loadedByName) {
          const isLoaded = window.loadedByName(projectData.value.character);
          if (isLoaded) {
            isCharacterLoaded.value = true;
          } else {
            window.addEventListener("loaChar", () => {
              if ((window as any).loaChar === 1) {
                isCharacterLoaded.value = true;
              }
            });
          }
        }

        setDimensions();
      } catch (err) {
        console.error("خطأ في تحميل Tamkin SDK:", err);
      }
    };

    const loadScript = (src: string): Promise<void> => {
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
    };

    const loadCSS = (href: string): Promise<void> => {
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
    };

    const setDimensions = () => {
      if (window.adjustCameraBasedOnCharacter) {
        window.adjustCameraBasedOnCharacter(
          1,
          charWidth.value,
          charHeight.value,
        );
      }
    };

    const fetchAppLinks = async () => {
      try {
        const response = await fetch(
          "https://api.tamkin.app/v1/api/Mobile/shareProjectLinks",
        );
        const result = await response.json();
        if (result.statusCode === 200 && result.succeeded) {
          appLinks.value = result.data;
        }
      } catch (error) {
        console.error("خطأ في جلب روابط التطبيقات:", error);
      }
    };

    const copyToClipboard = (text: string) => {
      if (text) {
        navigator.clipboard
          .writeText(text)
          .then(() => {})
          .catch(() => {});
      } else {
        alert("لا يوجد نص للنسخ!");
      }
    };

    const setupTextSelection = () => {};

    const checkCharacterLoaded = async () => {
      const checkInterval = 100;
      const maxAttempts = 1000;
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const tamkinCharacter = document.querySelector("tamkin-sdk-character");
        if (window.loaded && tamkinCharacter) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          isCharacterLoaded.value = true;
          isLoading.value = false;
          if (lottieInstance.value) {
            lottieInstance.value.destroy();
            lottieInstance.value = false;
          }
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, checkInterval));
      }
    };

    const updateScreenWidth = () => {
      screenWidth.value = window.innerWidth;
    };

    const onVideoPlay = () => {
      if (typeof window !== "undefined" && (window as any).changeSpeed) {
        (window as any).changeSpeed(3);
      }
    };

    // ===================== دورة الحياة =====================
    onMounted(async () => {
      if (typeof window !== "undefined" && !window.caches) {
        window.caches = {
          open: async () => ({
            put: () => Promise.resolve(),
            match: () => Promise.resolve(null),
          }),
        };
      }

      lottieInstance.value = lottie.loadAnimation({
        container: document.getElementById("loading-container"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });

      window.addEventListener("resize", updateScreenWidth);

      // تحميل البيانات
      await fetchProjectData();
      await fetchAppLinks();
      await loadfares();
      checkCharacterLoaded();

      const checkInterval = setInterval(() => {
        if (
          isCharacterLoaded.value &&
          subtitleTrackSrc.value &&
          !isLoading.value
        ) {
          clearInterval(checkInterval);
          const videoElement = document.querySelector(
            "video",
          ) as HTMLVideoElement;
          if (videoElement) {
            videoPlayer.value = videoElement;
            const trackElement = videoElement.querySelector("track");
            if (trackElement) {
              textTrack.value = (trackElement as HTMLTrackElement).track;
              if (textTrack.value) {
                textTrack.value.mode = "showing";
              }
            }
          }
        }
      }, 1000);

      window.addEventListener("loaChar", () => {
        if ((window as any).loaChar === 1) {
          isCharacterLoaded.value = true;
          if (window.adjustCameraBasedOnCharacter) {
            window.adjustCameraBasedOnCharacter(
              1,
              charWidth.value,
              charHeight.value,
            );
          }

          let speedAttempts = 0;
          const maxSpeedAttempts = 200;
          const checkActionInterval = setInterval(() => {
            if (
              (window as any).action &&
              typeof (window as any).action.timeScale !== "undefined" &&
              (window as any).changeSpeed
            ) {
              clearInterval(checkActionInterval);
              (window as any).changeSpeed(3);
            } else if (speedAttempts > maxSpeedAttempts) {
              clearInterval(checkActionInterval);
            }
            speedAttempts++;
          }, 100);
        }
      });

      window.addEventListener(
        "animation-queue-complete",
        handleAnimationComplete,
      );
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScreenWidth);
      if (textTrack.value) {
        textTrack.value.mode = "disabled";
      }
      if (lottieInstance.value) {
        lottieInstance.value.destroy();
      }
      window.removeEventListener("loaChar", () => {});
      window.removeEventListener(
        "animation-queue-complete",
        handleAnimationComplete,
      );
      window.removeEventListener("reset-character", () => {});
      window.removeEventListener("trigger-ad-animation", () => {});

      document.body.style.overflow = "";
      document.body.style.margin = "";
      document.body.style.padding = "";

      if (window.adjustCameraBasedOnCharacter) {
        window.adjustCameraBasedOnCharacter(
          1,
          charWidth.value,
          charHeight.value,
        );
      }
    });

    // ===================== Watch =====================
    watch(isCustomFullscreen, (newVal) => {
      if (window.adjustCameraBasedOnCharacter) {
        const width = newVal ? currentCharWidth.value : charWidth.value;
        const height = newVal ? currentCharHeight.value : charHeight.value;
        window.adjustCameraBasedOnCharacter(1, width, height);
      }
    });

    return {
      // الحالة
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

      // دوال التنقل
      navigateToPage1,
      navigateToPage2,

      // دوال
      toggleCustomFullscreen,
      fetchProjectData,
      loadSubtitle,
      isValidVtt,
      convertSrtToVtt,
      convertTextToSimpleVtt,
      formatTime,
      handleTriggerAdAnimation,
      handleAnimationComplete,
      handleResetCharacter,
      onCharacterLoaded,
      loadfares,
      loadScript,
      loadCSS,
      setDimensions,
      fetchAppLinks,
      copyToClipboard,
      setupTextSelection,
      checkCharacterLoaded,
      updateScreenWidth,
      onVideoPlay,
      useMockData,

      // Computed
      isSmallScreen,
      cardHeight,
      dialogMaxWidth,
      dialogContentClass,
    };
  },
});
</script>

<style scoped>
@import "@/assets/styles.css";

/* ============================================================
   أزرار التنقل الجديدة
   ============================================================ */
.nav-btn {
  min-width: 180px;
  font-family: "Cairo", sans-serif !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  text-transform: none !important;
  padding: 12px 24px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 15px rgba(6, 129, 119, 0.3) !important;
}

.nav-btn:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(6, 129, 119, 0.4) !important;
}

.nav-btn .v-icon {
  margin-left: 8px !important;
}

.gap-4 {
  gap: 16px;
}

@media (max-width: 768px) {
  .nav-btn {
    min-width: 140px !important;
    font-size: 14px !important;
    padding: 10px 16px !important;
  }
}

@media (max-width: 480px) {
  .gap-4 {
    gap: 10px;
  }
  .nav-btn {
    min-width: 120px !important;
    font-size: 12px !important;
    padding: 8px 12px !important;
  }
}

/* ============================================================
   باقي الأنماط من الكود الأصلي
   ============================================================ */
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

/* الشخصية */
.character-container {
  position: absolute;
  z-index: 10;
  transition: all 0.3s ease-in-out;
  opacity: 1;
}

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

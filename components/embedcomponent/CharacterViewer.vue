<template>
  <div
    :style="{
      height: '400px',
      position: 'relative',
      borderRadius: '9px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: !isCharacterLoaded ? 'white' : '#f4f4f4',
      boxShadow: !isCharacterLoaded ? 'none' : '0px 0px 10.5px 0px #cacdcd',
    }"
  >
    <div v-if="!isCharacterLoaded" class="loading-media" id="loading-container">
      <!-- Lottie or progress -->
    </div>
    <div v-if="projectData.type === 'image'">
      <TriggerAdAnimation2
        @click="triggerAdAnimation(projectData.text)"
        v-if="isCharacterLoaded"
      />
    </div>

    <tamkin-sdk-character
      ref="tamkinCharacter"
      :char-width="charWidth"
      :char-height="charHeight"
      :character="projectData.character"
      style="bottom: 0px; position: absolute"
    ></tamkin-sdk-character>

    <div class="character-controls" v-if="isSpeedButtonVisible">
      <v-slider
        v-model="speed"
        label="سرعة التحريك"
        min="1"
        max="10"
        step="1"
        thumb-label="always"
        @update:modelValue="updateAnimationSpeed"
      ></v-slider>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  PropType,
  onMounted,
  onUnmounted,
} from "vue";
import TriggerAdAnimation2 from "@/components/icons/triggerAdAnimation2.vue";

interface ProjectData {
  text?: string;
  character?: string;
  type?: string;
}

interface TamkinCharacter {
  playAnimation: (text: string, duration: number) => void;
  resetToIdle: () => void;
  setAnimationSpeed: (speed: number) => void;
}

export default defineComponent({
  name: "CharacterViewer",
  props: {
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
    charWidth: {
      type: Number,
      required: true,
    },
    charHeight: {
      type: Number,
      required: true,
    },
    isCharacterLoaded: {
      type: Boolean,
      required: true,
    },
    isFullscreenMode: {
      type: Boolean,
      default: false,
    },
    lottieInstance: Object,
  },
  components: {
    TriggerAdAnimation2,
  },
  emits: ["character-loaded"],
  setup(props, { emit }) {
    const tamkinCharacter = ref<TamkinCharacter | null>(null);
    const speed = ref(3);
    let isProcessing = false;
    const isSpeedButtonVisible = ref(false);
    const animationCache = ref<Map<string, string[]>>(new Map());

    const updateAnimationSpeed = (newSpeed: number) => {
      if (window.changeSpeed) {
        window.changeSpeed(newSpeed);
        console.log(`تم تحديث سرعة التحريك إلى: ${newSpeed}`);
      } else if (tamkinCharacter.value?.setAnimationSpeed) {
        tamkinCharacter.value.setAnimationSpeed(newSpeed);
      } else {
        console.warn("لا يمكن تحديث سرعة التحريك: SDK غير جاهز");
      }
    };

    const processAnimation = async (text: string, duration: number) => {
      if (isProcessing || !props.isCharacterLoaded) {
        return;
      }
      isProcessing = true;

      try {
        let rawPaths: string[] = [];

        if (animationCache.value.has(text)) {
          rawPaths = animationCache.value.get(text)!;
          window.changeSpeed(3);

          console.log("Using cached animation paths for text:", text);
        } else {
          const response = await fetch(
            "https://api.tamkin.app/v1/api/Ai/GetAnimation",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: text,
                lang: "ar",
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `API request failed with status ${response.status}`
            );
          }

          const apiData = await response.json();
          rawPaths =
            apiData.data && Array.isArray(apiData.data) ? apiData.data : [];
          animationCache.value.set(text, rawPaths);
        }

        if (
          typeof window.getAdAnimateFromFile === "function" &&
          rawPaths.length > 0
        ) {
          window.getAdAnimateFromFile(rawPaths);
          isSpeedButtonVisible.value = true;
            window.changeSpeed(3);
        } else {
          throw new Error("No animation data or SDK function not available");
        }

        await new Promise((resolve) => setTimeout(resolve, duration));
      } catch (error) {
        console.error(
          "Error occurred while fetching or loading animations:",
          error
        );
        if (
          tamkinCharacter.value &&
          typeof tamkinCharacter.value.playAnimation === "function"
        ) {
          tamkinCharacter.value.playAnimation("idle", duration);
            window.changeSpeed(3);
        }
      } finally {
        resetToIdle();
        isProcessing = false;
      }
    };

    const triggerAdAnimation = (
      rawData: string | { text: string; duration: number },
      defaultDuration: number = 3000
    ) => {
      let textToPlay = "";
      let animDuration = defaultDuration;
     

      if (typeof rawData === "object" && rawData.text && rawData.duration) {
        textToPlay = rawData.text;
        animDuration = rawData.duration;
      } else if (typeof rawData === "string") {
        textToPlay = rawData;
      } else {
        return;
      }

      processAnimation(textToPlay, animDuration);
    };

    const resetToIdle = () => {
      if (
        tamkinCharacter.value &&
        typeof tamkinCharacter.value.resetToIdle === "function"
      ) {
        tamkinCharacter.value.resetToIdle();
      }
      if (window.resetToIdle) {
        window.resetToIdle();
      }
    };

    watch(speed, (newSpeed) => {
      updateAnimationSpeed(newSpeed);
    });

    watch(
      () => props.isCharacterLoaded,
      (loaded) => {
        if (loaded) {
          emit("character-loaded");
          resetToIdle();
        }
      }
    );

    onMounted(() => {
      if (props.isCharacterLoaded && tamkinCharacter.value) {
        resetToIdle();
      }

      window.addEventListener("trigger-ad-animation", (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail && typeof customEvent.detail.text === "string") {
          triggerAdAnimation(customEvent.detail);
        }
      });

      window.addEventListener("reset-character", () => {
        resetToIdle();
      });
    });

    onUnmounted(() => {
      window.removeEventListener("trigger-ad-animation", () => {});
      window.removeEventListener("reset-character", () => {});
    });

    return {
      tamkinCharacter,
      speed,
      triggerAdAnimation,
      resetToIdle,
      updateAnimationSpeed,
      isSpeedButtonVisible,
    };
  },
});
</script>

<style scoped>
.character-controls {
  position: absolute;
  bottom: 290px;
  width: 80%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.character-container.character-fullscreen .character-controls {
  width: 60%;
  bottom: 20px;
}
.loading-media {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f0f0f0;
}

@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.loading-media::after {
  content: "جاري التحميل...";
  animation: fadeInOut 1.5s infinite;
  color: #666;
  font-size: 16px;
}
.character-fullscreen .character-controls {
  display: none;
}
</style>

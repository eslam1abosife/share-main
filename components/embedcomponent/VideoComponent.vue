<template>
  <div class="video-wrapper">
    <video
      ref="videoPlayer"
      @play="$emit('video-play', $event)"
      @pause="onVideoPause"
      @timeupdate="onVideoTimeUpdate"
      @ended="onVideoEnded"
      :src="projectData.project_link"
      class="media-video"
      style="background-color: black"
      :loop="repeat"
      @click="togglePlayPause"
      muted
    >
      <source type="video/mp4" />
      <track
        v-if="subtitleTrackSrc"
        ref="subtitleTrack"
        :src="subtitleTrackSrc"
        kind="subtitles"
        srclang="ar"
      />
      متصفحك لا يدعم تشغيل الفيديو.
    </video>

    <!-- Custom Video Controls -->
    <div
      class="custom-video-controls"
      v-if="showCustomControls"
      :class="{ 'fullscreen-controls': isFullscreen }"
    >
      <div class="control-bar">
        <div class="progress-container">
          <div class="progress-bar disabled-progress" @click="seekToPosition">
            <div
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            ></div>
            <div
              class="progress-handle"
              :style="{ left: progressPercentage + '%' }"
            ></div>
            <div
              v-for="(cue, index) in subtitleCues"
              :key="index"
              class="subtitle-segment disabled-segment"
              :style="{
                left: `${(cue.startTime / duration) * 100}%`,
                width: `${((cue.endTime - cue.startTime) / duration) * 100}%`,
                background:
                  index === currentCueIndex
                    ? 'rgba(76, 175, 80, 0.5)'
                    : 'rgba(255, 255, 255, 0.2)',
              }"
            ></div>
          </div>
          <div class="time-display">
            <span class="current-time">{{ formatTime(currentTime) }}</span>
            <span class="duration">/ {{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- Main Controls -->
        <div class="main-controls">
          <div class="control-group">
            <v-btn
              icon
              size="small"
              @click="togglePlayPause"
              :color="isPlaying ? 'red' : 'primary'"
              class="control-btn play-pause-btn"
            >
              <v-icon>{{ isPlaying ? "mdi-pause" : "mdi-play" }}</v-icon>
            </v-btn>
            <div class="volume-control">
              <v-btn icon size="small" @click="toggleMute" class="control-btn">
                <v-icon>{{
                  isMuted ? "mdi-volume-off" : "mdi-volume-high"
                }}</v-icon>
              </v-btn>
            </div>
          </div>

          <div class="subtitle-controls" v-if="hasSubtitles">
            <v-btn
              icon
              size="small"
              @click="previousSubtitle"
              :disabled="currentCueIndex === 0"
              class="control-btn subtitle-nav-btn"
              title="الترجمة السابقة"
            >
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <span class="subtitle-indicator">
              {{ currentCueIndex + 1 }} / {{ subtitleCues.length }}
            </span>
            <v-btn
              icon
              size="small"
              @click="nextSubtitle"
              :disabled="currentCueIndex >= subtitleCues.length - 1"
              class="control-btn subtitle-nav-btn"
              title="الترجمة التالية"
            >
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
            <div class="control-group">
              <v-btn
                icon
                size="small"
                @click="$emit('toggle-custom-fullscreen')"
                class="control-btn fullscreen-btn"
              >
                <v-icon>{{
                  isFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
                }}</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  onMounted,
  onUnmounted,
  watch,
  computed,
  nextTick,
} from "vue";

interface ProjectData {
  type?: string;
  project_link?: string;
  text?: string;
  subtitle?: string;
  character?: string;
}

interface VTTCueExtended extends VTTCue {
  text: string;
}

export default defineComponent({
  name: "VideoComponent",
  props: {
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
    subtitleTrackSrc: {
      type: String,
      default: null,
    },
    videoPlayer: {
      type: Object as PropType<HTMLVideoElement>,
      default: null,
    },
    textTrack: {
      type: Object as PropType<TextTrack>,
      default: null,
    },
    isFullscreenExternal: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "video-play",
    "trigger-ad-animation",
    "reset-character",
    "toggle-custom-fullscreen",
  ],
  setup(props, { emit }) {
    const videoPlayer = ref<HTMLVideoElement | null>(null);
    const subtitleTrack = ref<HTMLTrackElement | null>(null);
    const showCustomControls = ref(true);
    const isPlaying = ref(false);
    const isMuted = ref(true);
    const volume = ref(100);
    const currentTime = ref(0);
    const duration = ref(0);
    const repeat = ref(false);
    const isFullscreen = computed(() => props.isFullscreenExternal);
    const currentCueIndex = ref(-1);
    const subtitleCues = ref<VTTCueExtended[]>([]);
    const currentSubtitleText = ref("");
    const progressPercentage = ref(0);
    const isFullAnimationTriggered = ref(false);
    const subtitle = ref("");

    const hasSubtitles = computed(() => subtitleCues.value.length > 0);
    const startPlayback = () => {
      // إعادة تعيين الـ flag للسماح بتشغيل الأنيميشن من جديد
      isFullAnimationTriggered.value = false;

      videoPlayer.value?.play().then(() => {
        isPlaying.value = true;
        window.changeSpeed(2);

        // إذا كان لدينا subtitles → نطلق الأنيميشن فورًا
        if (hasSubtitles.value) {
          nextTick(() => {
            triggerFullAnimationImmediately();
          });
        }
      });
    };
    const triggerFullAnimationImmediately = () => {
      if (!hasSubtitles.value || isFullAnimationTriggered.value) {
        console.log("تخطي الأنيميشن: لا توجد subtitles أو تم التشغيل");
        window.changeSpeed(2);
        return;
      }

      isFullAnimationTriggered.value = true;

      const fullTextRaw = subtitleCues.value
        .map((cue) => cue.text)
        .join(" \n ");
      const fullCleanedText = fullTextRaw
        .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
        .replace(/ev/g, "")
        .replace(/\s+\d+$/g, "")
        .trim();

      if (fullCleanedText === "") {
        console.warn("النص فارغ بعد التنظيف");
        isFullAnimationTriggered.value = false;
        window.changeSpeed(2);
        return;
      }

      let originalDuration = 30000;
      if (duration.value > 0) {
        originalDuration = duration.value * 1000;
      } else if (subtitleCues.value.length > 0) {
        const lastCue = subtitleCues.value[subtitleCues.value.length - 1];
        originalDuration = Math.max(lastCue.endTime * 1000, 30000);
      }

      const speedFactor = 0.8;
      const totalDuration = Math.max(
        Math.floor(originalDuration * speedFactor),
        5000
      );

      console.log("بدء الأنيميشن فورًا (قبل أول subtitle):", {
        text: fullCleanedText,
        duration: totalDuration,
      });

      const event = new CustomEvent("trigger-ad-animation", {
        detail: { text: fullCleanedText, duration: totalDuration },
      });
      window.dispatchEvent(event);

      // تسريع الفيديو ليتماشى مع الأنيميشن
      window.changeSpeed(2);
    };

    const onVideoTimeUpdate = () => {
      if (videoPlayer.value) {
        currentTime.value = videoPlayer.value.currentTime;
        duration.value = videoPlayer.value.duration || 0;
        if (duration.value > 0) {
          progressPercentage.value = (currentTime.value / duration.value) * 100;
        }
        updateCurrentSubtitleDisplay();
      }
    };

    const onVideoPause = () => {
      isPlaying.value = false;
      window.changeSpeed(0);
    };

    const onVideoEnded = () => {
      isPlaying.value = false;
      emit("reset-character");
      isFullAnimationTriggered.value = false;
    };

    const updateCurrentSubtitleDisplay = () => {
      let textTrack = props.textTrack;
      if (!textTrack && subtitleTrack.value && videoPlayer.value) {
        textTrack = videoPlayer.value.textTracks[0];
      }

      if (!textTrack || !videoPlayer.value) return;

      const activeCues = textTrack.activeCues;
      if (activeCues && activeCues.length > 0) {
        const activeCue = activeCues[0] as VTTCueExtended;
        const newCueIndex = Array.from(textTrack.cues || []).indexOf(activeCue);

        if (newCueIndex !== currentCueIndex.value) {
          subtitle.value = activeCue.text;
          currentSubtitleText.value = activeCue.text;
          currentCueIndex.value = newCueIndex;
        }
      } else {
        subtitle.value = "";
        currentSubtitleText.value = "";
      }
    };

    const parseSubtitles = async () => {
      if (!props.subtitleTrackSrc) return;

      try {
        const response = await fetch(props.subtitleTrackSrc);
        if (!response.ok) throw new Error(`فشل جلب: ${response.status}`);
        const vttText = await response.text();

        const cues: VTTCueExtended[] = [];
        const lines = vttText.split("\n");
        let currentCue = null;
        for (let i = 0; i < lines.length; i++) {
          let line = lines[i].trim();
          if (line === "WEBVTT" || line.startsWith("NOTE") || line === "")
            continue;
          if (/^\d+$/.test(line)) continue;

          if (line.includes("-->")) {
            if (currentCue) cues.push(currentCue);
            const [start, end] = line.split("-->").map((s) => s.trim());
            currentCue = {
              startTime: parseVTTTime(start),
              endTime: parseVTTTime(end),
              text: "",
            };
          } else if (currentCue && line) {
            let cleanedLine = line
              .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
              .replace(/ev/g, "")
              .replace(/\s+\d+$/g, "")
              .trim();
            if (cleanedLine !== "") {
              currentCue.text += (currentCue.text ? " " : "") + cleanedLine;
            }
          }
        }
        if (currentCue) cues.push(currentCue);

        subtitleCues.value = cues
          .map(
            (c) => new VTTCue(c.startTime, c.endTime, c.text) as VTTCueExtended
          )
          .filter((c) => c.text.trim() !== "");

        console.log(
          "تم تحميل الـ subtitles",
          subtitleCues.value.length,
          "جملة"
        );

        // تشغيل الأنيميشن فور تحميل الـ subtitles (قبل أي cue)
        if (
          videoPlayer.value &&
          hasSubtitles.value &&
          !isFullAnimationTriggered.value
        ) {
          nextTick(() => {
            triggerFullAnimationImmediately();
          });
        }
      } catch (error) {
        console.error("خطأ في parseSubtitles:", error);
      }
    };

    const parseVTTTime = (timeStr: string): number => {
      try {
        const parts = timeStr.split(":");
        const seconds = parseFloat(parts[2]);
        const minutes = parseInt(parts[1]) * 60;
        const hours = parseInt(parts[0]) * 3600;
        return hours + minutes + seconds;
      } catch {
        return 0;
      }
    };

    const togglePlayPause = () => {
      if (!videoPlayer.value) return;

      if (isPlaying.value) {
        videoPlayer.value.pause();
      } else {
        startPlayback();
      }
    };

    const toggleMute = () => {
      if (videoPlayer.value) {
        isMuted.value = !isMuted.value;
        videoPlayer.value.muted = isMuted.value;
        if (!isMuted.value) {
          videoPlayer.value.volume = volume.value / 100;
        }
      }
    };

    const seekToPosition = (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      return false;
    };

    const jumpToSubtitle = (index: number) => {
      if (!videoPlayer.value || index < 0 || index >= subtitleCues.value.length)
        return;

      const cue = subtitleCues.value[index];
      videoPlayer.value.currentTime = cue.startTime;
      currentTime.value = cue.startTime;
      if (duration.value > 0) {
        progressPercentage.value = (cue.startTime / duration.value) * 100;
      }
      currentSubtitleText.value = cue.text;
      subtitle.value = cue.text;

      if (!isPlaying.value) {
        startPlayback(); // <-- نستخدم نفس الدالة لإعادة التشغيل + الأنيميشن
      }
    };

    const nextSubtitle = () => {
      if (currentCueIndex.value < subtitleCues.value.length - 1) {
        jumpToSubtitle(currentCueIndex.value + 1);
      }
    };

    const previousSubtitle = () => {
      if (currentCueIndex.value > 0) {
        jumpToSubtitle(currentCueIndex.value - 1);
      }
    };

    const formatTime = (seconds: number): string => {
      if (isNaN(seconds)) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    watch(
      () => props.videoPlayer,
      (newPlayer) => {
        if (newPlayer) {
          videoPlayer.value = newPlayer;
          isPlaying.value = !newPlayer.paused;
          isMuted.value = newPlayer.muted;
          volume.value = newPlayer.volume * 100;
        }
      }
    );

    watch(
      () => props.subtitleTrackSrc,
      async (newSrc) => {
        if (newSrc) {
          subtitleCues.value = [];
          await parseSubtitles();
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      if (props.subtitleTrackSrc) {
        await parseSubtitles();
      }

      if (props.videoPlayer) {
        videoPlayer.value = props.videoPlayer;
      }

      if (videoPlayer.value) {
        isPlaying.value = !videoPlayer.value.paused;
        isMuted.value = videoPlayer.value.muted;
        volume.value = videoPlayer.value.volume * 100;
        currentTime.value = videoPlayer.value.currentTime;
        duration.value = videoPlayer.value.duration || 0;

        videoPlayer.value.addEventListener("pause", onVideoPause);
        videoPlayer.value.addEventListener("volumechange", () => {
          isMuted.value = videoPlayer.value!.muted;
          volume.value = videoPlayer.value!.volume * 100;
        });
        videoPlayer.value.addEventListener("timeupdate", onVideoTimeUpdate);
        videoPlayer.value.addEventListener("ended", onVideoEnded);
        videoPlayer.value.addEventListener("loadedmetadata", () => {
          duration.value = videoPlayer.value!.duration || 0;
        });

        const textTrack = videoPlayer.value.textTracks[0];
        if (textTrack) {
          textTrack.mode = "showing";
          textTrack.addEventListener("cuechange", updateCurrentSubtitleDisplay);
        }

        // إذا كان الفيديو يعمل بالفعل (autoplay)
        if (
          !videoPlayer.value.paused &&
          hasSubtitles.value &&
          !isFullAnimationTriggered.value
        ) {
          nextTick(() => {
            triggerFullAnimationImmediately();
          });
        }
      }
    });

    onUnmounted(() => {
      if (videoPlayer.value) {
        videoPlayer.value.removeEventListener("pause", onVideoPause);
        videoPlayer.value.removeEventListener("volumechange", () => {});
        videoPlayer.value.removeEventListener("timeupdate", onVideoTimeUpdate);
        videoPlayer.value.removeEventListener("ended", onVideoEnded);
        videoPlayer.value.removeEventListener("loadedmetadata", () => {});

        const textTrack = videoPlayer.value.textTracks[0];
        if (textTrack) {
          textTrack.removeEventListener(
            "cuechange",
            updateCurrentSubtitleDisplay
          );
        }
      }
    });

    return {
      videoPlayer,
      subtitleTrack,
      showCustomControls,
      isPlaying,
      isMuted,
      volume,
      currentTime,
      duration,
      repeat,
      isFullscreen,
      currentCueIndex,
      subtitleCues,
      currentSubtitleText,
      progressPercentage,
      hasSubtitles,
      onVideoTimeUpdate,
      onVideoPause,
      onVideoEnded,
      togglePlayPause,
      toggleMute,
      seekToPosition,
      nextSubtitle,
      previousSubtitle,
      formatTime,
      jumpToSubtitle,
      subtitle,
    };
  },
});
</script>

<style scoped>
@import "../../assets/stylevideo.css";
</style>

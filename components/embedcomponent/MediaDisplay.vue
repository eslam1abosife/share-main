<template>
  <div
    v-if="!isCharacterLoaded"
    class="loading-media"
    id="loading-container"
  ></div>
  <div v-else class="video-container" ref="videoContainer">
    <div class="media-content">
      <ImageComponent
        v-if="projectData.type === 'image'"
        :projectData="projectData"
      />
      <VideoComponent
        v-if="projectData.type === 'video' || projectData.type === 'audio'"
        :projectData="projectData"
        :subtitleTrackSrc="subtitleTrackSrc"
        :videoPlayer="videoPlayer"
        :textTrack="textTrack"
        :isFullscreenExternal="isFullscreenExternal"
        @video-play="$emit('video-play', $event)"
        @trigger-ad-animation="$emit('trigger-ad-animation', $event)"
        @reset-character="$emit('reset-character')"
        @toggle-custom-fullscreen="$emit('toggle-custom-fullscreen')"
      />
      <PdfComponent
        v-if="projectData.type === 'pdf' || projectData.type === 'word'"
        :projectData="projectData"
        @trigger-ad-animation="$emit('trigger-ad-animation', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import ImageComponent from "@/components/embedcomponent/ImageComponent.vue";
import VideoComponent from "@/components/embedcomponent/VideoComponent.vue";
import PdfComponent from "@/components/embedcomponent/PdfComponent.vue";

interface ProjectData {
  type?: string;
  project_link?: string;
  text?: string;
  subtitle?: string;
  character?: string;
}

export default defineComponent({
  name: "MediaDisplay",
  props: {
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
    subtitleTrackSrc: {
      type: String,
      default: null,
    },
    isCharacterLoaded: {
      type: Boolean,
      required: true,
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
  components: {
    ImageComponent,
    VideoComponent,
    PdfComponent,
  },
  emits: [
    "video-play",
    "trigger-ad-animation",
    "reset-character",
    "toggle-custom-fullscreen",
  ],
  setup() {
    const videoContainer = ref<HTMLElement | null>(null);

    return {
      videoContainer,
    };
  },
});
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.media-content {
  width: 100%;
  height: 100%;
}

.loading-media {
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.custom-fullscreen .media-content {
  height: 100% !important;
}
.custom-fullscreen .video-wrapper {
  width: 100% !important;
}
.custom-fullscreen .video-container .media-content {
  height: 100% !important;
}
</style>

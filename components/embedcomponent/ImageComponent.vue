<template>
  <div class="image-wrapper">
    <img
      :src="projectData.project_link"
      class="media-image"
      alt="Media Image"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface ProjectData {
  type?: string;
  project_link?: string;
}

export default defineComponent({
  name: "ImageComponent",
  props: {
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
  },
});
</script>

<style scoped>
.image-wrapper {
  width: 100%;
  height: 100%;
}

.media-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
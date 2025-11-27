<template>
  <div class="document-wrapper">
    <div class="document-controls">
      <v-text-field
        class="pdf-text-field"
        label="نسخ النص"
        variant="outlined"
        v-model="input_pdf"
        hide-details
      ></v-text-field>
      <TriggerAdAnimation4icon
        @click="triggerAdAnimation4"
        class="trigger-icon"
      />
    </div>
    <div class="document-viewer">
      <iframe :src="documentViewerUrl" class="pdf-frame" @load="onDocumentLoad">
        هذا المستعرض لا يدعم عرض ملفات PDF.
      </iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from "vue";
import TriggerAdAnimation4icon from "@/components/icons/triggerAdAnimation4icon.vue";

interface ProjectData {
  type?: string;
  project_link?: string;
}

export default defineComponent({
  name: "PdfComponent",
  props: {
    projectData: {
      type: Object as PropType<ProjectData>,
      required: true,
    },
  },
  components: {
    TriggerAdAnimation4icon,
  },
  emits: ["trigger-ad-animation"],
  setup(props, { emit }) {
    const input_pdf = ref<string>("");

    const documentViewerUrl = computed(() => {
      const url = encodeURIComponent(props.projectData.project_link || "");
      return `https://docs.google.com/viewer?url=${url}&embedded=true`;
    });

    const triggerAdAnimation4 = () => {
      if (input_pdf.value.trim()) {
        const event = new CustomEvent("trigger-ad-animation", {
          detail: { text: input_pdf.value, duration: 30000 },
        });
        window.dispatchEvent(event);
      }
    };

    const onDocumentLoad = () => {};

    return {
      input_pdf,
      documentViewerUrl,
      triggerAdAnimation4,
      onDocumentLoad,
    };
  },
});
</script>

<style scoped>
.document-wrapper {
  width: 100%;
  height: 100%;
}

.document-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.pdf-text-field {
  max-width: 300px;
}

.document-viewer {
  width: 100%;
  height: 100%;
}

.pdf-frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>

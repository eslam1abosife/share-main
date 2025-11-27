<template>
  <div>
    <!-- باقي الصفحة -->
    <div style="width: 100%">
      <!-- Header -->
      <Header />

      <!-- Main Content -->
      <main>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<script setup lang="ts">
const route = useRoute();
const atHomepage = computed(() => route.path === "/");
</script>
<template>
  <div class="bg_container">
    <div class="curtain"></div>
    <div class="test"></div>
    <AppHeader :showIntro="atHomepage" />

    <main class="main">
      <div class="page_wrapper">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
<style scoped></style>

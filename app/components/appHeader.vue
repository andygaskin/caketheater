<!-- components/AppHeader.vue -->
<template>
  <header class="site-header">
    <NuxtLink to="/" class="brand"
      ><img src="@/assets/images/logo.webp" alt="Cake Theater logo"
    /></NuxtLink>
  </header>
</template>
<style scoped>
.site-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--gap_large);
}
</style>

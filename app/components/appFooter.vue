<!-- components/AppFooter.vue -->
<template>
  <footer class="site-footer">
    <p>&copy; {{ new Date().getFullYear() }} Cake Theater</p>
  </footer>
</template>
<style scoped>
.site-footer {
  text-align: center;
  padding: var(--gap_large);
  font-size: 0.875rem;
  color: var(--color_text_muted);
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>

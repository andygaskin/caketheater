<!-- components/AppFooter.vue -->
<template>
  <footer class="site-footer">
    <p>
      &copy;{{ new Date().getFullYear() }} Cake Theater
      <!-- <i class="pi pi-circle-fill"></i>
      <NuxtLink to="/contact">Contact</NuxtLink> -->
    </p>
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

i {
  font-size: 0.3rem;
  vertical-align: middle;
  margin: var(--gap_xsmall);
}
</style>

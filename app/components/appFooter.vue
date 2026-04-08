<!-- components/AppFooter.vue -->
<template>
  <footer class="site-footer">
    <div>About CT <i class="pi pi-circle-fill"></i>
      Contact
    </div>
    <div>
      &copy;{{ new Date().getFullYear() }} Cake Theater

    </div>
  </footer>
</template>
<style scoped>
.site-footer {
  text-align: center;
  padding: var(--gap_large);
  font-size: 0.875rem;
  color: #fff;
  font-family: Georgia, "Times New Roman", Times, serif;
}

i {
  font-size: 0.3rem;
  vertical-align: middle;
  margin: var(--gap_xsmall);
}
</style>

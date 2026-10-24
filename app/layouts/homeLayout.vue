<template>
  <div class="bg_container">
    <div class="curtain"></div>
    <div class="test"></div>

    <AppHeader intro="true" />

    <main id="main-content" class="main" tabindex="-1">
      <div class="page_wrapper">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
<style scoped></style>

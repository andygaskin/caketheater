<template>
  <div class="bg_container">
    <div class="curtain"></div>
    <div class="test"></div>

    <AppHeader intro="true" />

    <main class="main">
      <div class="page_wrapper">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
<style scoped></style>

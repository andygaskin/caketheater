<template>
  <div class="bg_container">
    <div class="test"></div>

    <AppHeader />

    <main class="main">
      <div class="page_wrapper">
        <slot />
      </div>
    </main>

    <AppFooter />
  </div>
</template>
<style scoped></style>

<script setup lang="ts">
defineProps<{
  showIntro?: boolean | null;
}>();
</script>
<!-- components/AppHeader.vue -->
<template>
  <header class="site-header">
    <NuxtLink to="/" class="logo"
      ><img src="@/assets/images/logo.webp" alt="Cake Theater logo"
    /></NuxtLink>
    <Transition name="intro">
      <div v-show="showIntro" class="text_holder">
        <h1>Where cakes take center stage</h1>
        <div class="flex_align">
          <h2>Share your designs</h2>
          <i class="pi pi-star pi-spin" />
          <h2>Spark fresh ideas</h2>
        </div>
      </div></Transition
    >
    <div class="plank">
      <img src="@/assets/images/plank.webp" alt="plank" />
    </div>
  </header>
</template>
<style scoped>
.plank {
  @media (width < 600px) {
    height: 65px;
    width: 100%;
  }

  & img {
    width: 100%;
    @media (width < 850px) {
      height: 100%;
      object-fit: cover;
      object-position: left;
    }
  }
}
.logo {
  margin-bottom: var(--gap_medium);
}
.text_holder {
  height: auto;
  transition: all 1s ease-in-out;
  text-align: center;
  margin-bottom: var(--gap_large);
  margin-top: var(--gap_medium);
}

/* .intro-enter-active,
.intro-leave-active {
  overflow: hidden;
} */

.intro-enter-from,
.intro-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
  filter: blur(0.5rem);
}

.intro-enter-to,
.intro-leave-from {
  max-height: 500px;
  opacity: 1;
  margin-bottom: var(--gap_large);
  margin-top: var(--gap_medium);
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--gap_large);
}
h1 {
  /* font-family: Usual, var(--primary-font); */
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #fff;
  font-size: 2.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  /* margin-bottom: var(--gap_small); */
}

h2 {
  /* font-family: var(--primary-font); */
  font-family: Georgia, "Times New Roman", Times, serif;

  font-size: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
}
</style>

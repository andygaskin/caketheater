<!-- layouts/default.vue -->
<template>
  <div class="">
    <AppHeader />

    <main class="main">
      <div class="page_wrapper">
        <div class="lamplit-parchment">
          <div class="lamplit__bg" aria-hidden="true"></div>
          <div class="lamplit__content">
            <slot />
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
<style scoped>
.lamplit-parchment {
  border-radius: 12px;
  box-shadow: var(--box_shadow);
  padding: var(--gap_large);
  position: relative;
  /* Base tone (warm paper) */
  background-color: #ce916f;

  /* Layered lighting + very subtle hue drift */
  background-image:
    /* Lamplight hotspot (bright center/top) */
    radial-gradient(
      1200px 520px at 50% 18%,
      rgba(255, 250, 240, 0.95) 0%,
      rgba(255, 246, 232, 0.55) 35%,
      rgba(239, 225, 207, 0) 72%
    ),
    /* Gentle vignette / edge darkening */
    radial-gradient(
        1400px 900px at 50% 55%,
        rgba(0, 0, 0, 0) 55%,
        rgba(0, 0, 0, 0.07) 100%
      ),
    /* Bottom “twilight” drift (the slight purplish shift you noticed) */
    linear-gradient(
        to bottom,
        rgba(120, 95, 140, 0) 55%,
        rgba(120, 95, 140, 0.06) 100%
      );
  overflow: hidden;
  height: 100vh;
}

.lamplit-parchment::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url("@/assets/images/texture.webp") repeat;
  opacity: 0.535; /* tune */
  pointer-events: none;
  z-index: 0;

  background-size: contain;
}

.lamplit-parchment > * {
  position: relative;
  z-index: 1;
}
</style>

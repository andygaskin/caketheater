<script setup lang="ts">
import { fetchCakeDetail } from "@/services/cakeDetails";
import { countryName } from "@/utils/country";

const route = useRoute();
const slug = computed(() => String(route.params.slug || ""));

const {
  data: cake,
  pending,
  error,
} = await useAsyncData(
  () => `cake:${slug.value}`,
  () => fetchCakeDetail(slug.value),
  { watch: [slug] },
);

// Optional 404 handling
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Cake not found",
  });
}

useSeoMeta({
  title: cake.value
    ? `${cake.value.title} — Cake Theater`
    : "Cake — Cake Theater",

  description: cake.value?.description?.slice(0, 160),
});

//If I want to preload the first image
// useHead(() => ({
//   link: cake.value?.images?.[0]
//     ? [
//         {
//           rel: "preload",
//           as: "image",
//           href: `/cakes/${cake.value.images[0].filename}.jpg`,
//         },
//       ]
//     : [],
// }));
</script>

<template>
  <div class="page">
    <div class="lamplit-parchment">
      <div class="lamplit__bg" aria-hidden="true"></div>
      <div class="lamplit__content">
        <div v-if="pending">Loading…</div>

        <div v-else-if="cake">
          <h1>{{ cake.title }}</h1>
          <p>
            by <strong>{{ cake.baker.displayName }}</strong>
            <span v-if="cake.baker.country"
              >&nbsp;({{ countryName(cake?.baker.country, "en") }})</span
            >
          </p>

          <section v-if="cake.images.length" class="cake_holder">
            <div>
              <div v-for="img in cake.images" :key="img.id">
                <img
                  class="cake_image"
                  :src="`/cake_images/${img.filename}_medium.jpg`"
                  :alt="img.description || cake.title"
                  loading="lazy"
                />
              </div>
            </div>
            <div>
              <div class="body_text" v-if="cake.description">
                {{ cake.description }}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.lamplit-parchment {
  opacity: 1;

  animation-duration: 1s;
  animation-fill-mode: backwards; /* Ensures the start state (0% keyframe) is applied before the animation begins */
  animation-name: fadeInUp;
  animation-delay: 0.7s; /* Optional: adds a delay after page load */
}

/* 2. Define the animation sequence with @keyframes */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* Final position */
  }
}

.cake_image {
  /* max-width: 300px; */
  border: 1px solid var(--color_border);
  border-radius: 8px;
  box-shadow: var(--box_shadow);
  border: 1px solid var(--primary-color);
  margin-bottom: var(--gap_medium);
  content-visibility: auto;

  @media (width<1000px) {
    width: 100%;
  }
}

.cake_holder {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap_medium);

  @media (width<800px) {
    grid-template-columns: 1fr;
    order: 1;
  }
}

h1 {
  color: var(--primary-color);
  font-family: var(--primary-font);
}

p {
  font-family: var(--primary-font);
}
</style>

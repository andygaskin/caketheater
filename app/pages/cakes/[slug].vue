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
    statusMessage: "Cake not found. Sad. (please try again later)",
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
    <div class="detail_holder">
      <div class="side">
        <div v-if="cake">
          <p>
            <strong>{{ cake.baker.displayName }}</strong>
            <span v-if="cake.baker.country"
              >&nbsp;({{ countryName(cake?.baker.country, "en") }})</span
            >
          </p>
        </div>
      </div>
      <!--Main cake-->
      <div class="lamplit-parchment">
        <div class="lamplit__bg" aria-hidden="true"></div>
        <div class="lamplit__content">
          <div v-if="pending">Loading…</div>

          <div v-else-if="cake">
            <h1>{{ cake.title }}</h1>

            <ul class="tags">
              <li
                v-for="category in cake.categories"
                :key="`${category.group}:${category.slug}`"
              >
                <a>
                  <!-- <NuxtLink
                  :to="`/categories/${category.group}/${category.slug}`"
                > -->
                  {{ category.name }}
                  <!-- </NuxtLink> --></a
                >
              </li>
            </ul>

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
                  <hr />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: var(--gap_small);
  margin-bottom: 10px;
  margin-top: 10px;
}
.tags li a {
  width: auto;
  border: 1px solid rgb(134, 36, 163);
  border-radius: 5px;
  font-size: 0.9rem;
  color: rgb(167, 120, 163);
  padding: 4px;
  text-decoration: none;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: rgb(78, 1, 78);
  display: flex;
  align-items: center;
}

.detail_holder {
  display: grid;
  grid-template-columns: 1fr 3.5fr;
  @media (width<650px) {
    display: flex;
    flex-direction: column;
  }
}

.side {
  background: darkblue url("@/assets/images/blue_fabric.webp");
  border-radius: 10px;
  padding: var(--gap_medium);
  color: #fff;
  box-shadow:
    var(--box_shadow),
    inset 0 0 15px rgba(0, 0, 0, 0.2);

  @media (width<650px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
.lamplit-parchment {
  opacity: 1;

  animation-duration: 1s;
  animation-fill-mode: backwards; /* Ensures the start state (0% keyframe) is applied before the animation begins */
  animation-name: fadeInUp;
  animation-delay: 0.1s; /* Optional: adds a delay after page load */

  @media (width<650px) {
    border-radius: 0;
  }
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
  border-radius: 28px;
  corner-shape: squircle;
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

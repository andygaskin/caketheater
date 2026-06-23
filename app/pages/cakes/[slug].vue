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
    statusMessage: "Cake not found. Sadge. (please try again later)",
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
      <div class="title_container">
        <div class="title">
          <div v-if="cake">
            <h1>{{ cake.title }}</h1>
            <p>
              <strong>{{ cake.baker.displayName }}</strong>
              <span v-if="cake.baker.country">&nbsp;({{ countryName(cake?.baker.country, "en") }})</span>
            </p>
          </div>
        </div>
      </div>
      <!--Main cake-->
      <div class="lamplit-parchment">
        <div class="lamplit__bg" aria-hidden="true"></div>
        <div class="lamplit__content">
          <div v-if="pending">Loading…</div>

          <div v-else-if="cake">


            <ul class="tags">
              <li v-for="category in cake.categories" :key="`${category.group}:${category.slug}`">

                <NuxtLink :to="`/categories/${category.slug}`">

                  {{ category.name }}
                </NuxtLink>

              </li>
            </ul>

            <section v-if="cake.images.length" class="cake_holder">
              <div>
                <div v-for="img in cake.images" :key="img.id">
                  <img class="cake_image" :src="`/cake_images/${img.filename}_medium.jpg`"
                    :alt="img.description || cake.title" loading="lazy" />
                </div>
              </div>
              <div>
                <div v-if="cake.description" class="body_text">
                  {{ cake.description }}
                  <hr />
                </div>

                <!-- comments-->

                <section v-if="cake?.comments.length" class="comments">
                  <h2>Comments</h2>

                  <article v-for="comment in cake.comments" :key="comment.id" class="comment">
                    <p class="comment_body" style="font-style: italic;">
                      {{ comment.body }}
                    </p>

                    <p class="comment_meta" style="font-style: italic; ">
                      <!-- <NuxtLink v-if="comment.author.slug" :to="`/bakers/${comment.author.slug}`"> -->
                      --{{ comment.author.displayName }}
                      <!-- </NuxtLink> -->

                      <!-- <span v-else>
                          {{ comment.author.displayName }}
                        </span> -->

                      <!-- <span> · {{ comment.createdAt }}</span> -->
                    </p>
                  </article>
                </section>

                <section v-else class="comments">
                  <h2>Comments</h2>
                  <p>No comments yet.</p>
                </section>




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
  color: rgb(199, 156, 195);
  /* padding: 5px; */
  height: 30px;
  padding: var(--gap_small);
  padding-bottom: 12px;
  text-decoration: none;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: rgb(78, 1, 78);
  display: flex;
  align-items: center;
  align-content: center;
  transition: all 0.1s;

  &:hover {
    background: rgb(134, 36, 163);
    color: #fff;
    text-decoration: underline;
  }
}

.detail_holder {
  /* display: grid; */
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: moveUp 1.3s ease-out forwards;


}

.title_container {

  position: sticky;
  top: 45px;
  container-type: scroll-state;
  border-radius: 10px 10px 0 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  align-content: center;
  font-family: var(--primary-font);

}

.title {
  width: 99.5%;
  background: darkblue url("@/assets/images/blue_fabric.webp");
  padding: var(--gap_medium);
  color: #fff;
  box-shadow:
    var(--box_shadow),
    inset 0 0 15px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  @media (width<650px) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

@container scroll-state(stuck: top) {
  .title {
    background-color: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    padding: var(--gap_small);
    width: 100%;
    padding-left: var(--gap_medium);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

  }

  .title h1 {
    font-size: 2.7rem;
  }
}

h1 {
  color: #fff;
  font-size: 3rem;

  transition: all 0.2s ease;
}





.lamplit-parchment {
  opacity: 1;

  animation-duration: 1s;
  animation-fill-mode: backwards;
  /* Ensures the start state (0% keyframe) is applied before the animation begins */
  animation-name: fadeInUp;
  animation-delay: 0.1s;
  /* Optional: adds a delay after page load */

  @media (width<650px) {
    border-radius: 0;
  }
}


@keyframes moveUp {
  /* 0% {
   
    transform: translateY(20px);
  } */

  100% {

    transform: translateY(-50px);
    /* Final position */
  }
}



@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
    /* Final position */
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



p {
  font-family: var(--primary-font);
}
</style>
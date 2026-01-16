<script setup lang="ts">
import { fetchFeatured } from "@/services/featuredApi";

const { data, pending, error } = await useAsyncData("featured", fetchFeatured);

useHead({
  title: "Cake Theater - Share your designs. Spark fresh ideas.",
  meta: [
    {
      name: "description",
      content: "Cake Theater is a fun way to share your cake designs.",
    },
  ],
});
</script>

<template>
  <!--  
    <h1>Cake Theater</h1>
    <h2>
      Where cakes take center stage.<br />
      Share your designs. Spark fresh ideas. <i class="pi pi-star" />
    </h2> -->
  <!-- <Button label="Verify" /> -->
  <!-- <hr /> -->

  <!-- Loading -->
  <p v-if="pending">Loading cakes...</p>

  <!-- Error -->
  <div v-else-if="error">
    <p>Unable to load featured cakes.</p>
    <pre style="white-space: pre-wrap">{{ error }}</pre>
  </div>

  <!-- Success -->
  <div v-else>
    <!-- <h2>Featured Cakes</h2> -->
    <div class="main_card_holder">
      <div
        v-for="cake in data"
        :key="cake.slug"
        style="margin-bottom: 1rem; padding: 1rem"
      >
        <NuxtLink :to="`/cakes/${cake.slug}`" class="block_holder">
          <div class="the_image">
            <img
              :src="`/cake_images/${cake.cover_filename}.jpg`"
              :alt="cake.title"
            />
          </div>
          <div class="project_title">
            <strong>{{ cake.title }}</strong
            ><br />
            <span>by {{ cake.baker }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main_card_holder {
  display: grid;
  gap: 25px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  /* padding-top: 50px; */
  row-gap: var(--gap_large);
  transition: all 0.5s;
  /* width: 90%; */

  @media (width<1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (width<650px) {
    grid-template-columns: 1fr;
  }
}

.block_holder {
  content-visibility: auto;
  cursor: pointer;
  align-items: center;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 10px;

  color: var(--primary-color);
  display: flex;
  flex-flow: column;
  height: 200px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.5s;

  &:hover {
    border: 1px solid rgb(161, 104, 161);
    color: #000;
    box-shadow:
      0.6px 1.1px 3.9px rgb(0 0 0 / 5%),
      5px 9px 31px rgb(0 0 0 / 11%);
    text-decoration: underline;
    .project_title {
      text-decoration: underline;
    }
  }
}

.the_image {
  width: 100%;
  /* background-size: cover;
  background-repeat: no-repeat;
  background-position: top; */
  height: 100%;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 15%;
  }
}
.project_title {
  font-family: var(--primary-font);
  font-size: 1.1rem;
  text-align: center;
  color: var(--primary-color);
  padding: 5px;
  padding-top: 7px;
  text-decoration: none;
  position: absolute;
  /* z-index: 11; */
  bottom: 0;
  width: 100%;
  background: #fff;
}
</style>

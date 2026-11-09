<script setup lang="ts">
import { fetchCategoryCakes, CATEGORY_PAGE_SIZE } from "~/services/category";
import type { CategorySort } from "~/services/category";
import { findCategoryBySlug } from "@/constants/categories";
import SelectButton from "primevue/selectbutton";
import Paginator from "primevue/paginator";
import type { PageState } from "primevue/paginator";
import Skeleton from "primevue/skeleton";

const sortOptions = ["Popular", "Latest"];

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const page = computed(() => Number(route.params.page || 1));
const sortKey = computed<CategorySort>(() => route.path.includes("/latest") ? "latest" : "popular");
const heading = ref<HTMLElement | null>(null);

definePageMeta({
  validate: (route) => {
    const page = String(route.params.page || "1");
    return /^[1-9]\d*$/.test(page) && Number(page) <= 1000000;
  },
});

function listingUrl(targetPage: number, sort: CategorySort = sortKey.value) {
  return `/categories/${slug.value}${sort === "latest" ? "/latest" : ""}${targetPage > 1 ? `/page/${targetPage}` : ""}`;
}

const sort = computed({
  get: () => sortKey.value === "latest" ? "Latest" : "Popular",
  set: (value: string) => { void navigateTo(listingUrl(1, value === "Latest" ? "latest" : "popular")); },
});

async function changePage(event: PageState) {
  await navigateTo(listingUrl(event.page + 1));
  heading.value?.scrollIntoView({ block: "start" });
  heading.value?.focus({ preventScroll: true });
}

const categoryMatch = computed(() => findCategoryBySlug(slug.value));

if (!categoryMatch.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Category not found. Sadge. (please try again later)",
  });
}

const { data, status, error, refresh } = await useAsyncData(
  () => `category:${slug.value}:${sortKey.value}:${page.value}`,
  () => fetchCategoryCakes(categoryMatch.value!.category.slug, page.value, sortKey.value),
  { server: false },
);
const loading = computed(() => status.value === "idle" || status.value === "pending");

useSeoMeta({
  title: () => `${categoryMatch.value?.category.name} Cakes${page.value > 1 ? ` - Page ${page.value}` : ""} - Cake Theater`,
  description: () => `Browse ${categoryMatch.value?.category.name.toLowerCase()} cakes on Cake Theater.`,
});
</script>

<template>
  <div class="page">
    <div class="sort_holder">
      Sort by:
      <SelectButton v-model="sort" :options="sortOptions" :allow-empty="false" aria-label="Sort cakes" />
    </div>
    <h1 ref="heading" tabindex="-1">{{ categoryMatch?.category.name }} Cakes</h1>
    <p class="body_text" style="color: white">
      {{ sort }} {{ categoryMatch?.category.name.toLowerCase() }} cakes 🎂
    </p>

    <!-- Loading -->
    <div v-if="loading" aria-busy="true" aria-label="Loading cakes">
      <p role="status">Loading cakes...</p>
      <div class="main_card_holder" aria-hidden="true">
        <Skeleton v-for="n in 6" :key="n" height="240px" border-radius="30px" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error">
      <p>Unable to load cakes.</p>
      <button type="button" @click="refresh()">Try again</button>
    </div>

    <!-- Success -->

    <div v-else>
      <div v-if="!data?.cakes.length" class="empty_state">
        <p>{{ page > 1 ? "There are no cakes on this page." : "No cakes in this category yet." }}</p>
        <NuxtLink v-if="page > 1" :to="listingUrl(1)">Back to page 1</NuxtLink>
      </div>
      <div class="main_card_holder">
        <NuxtLink
          v-for="(cake, index) in data?.cakes"
          :key="cake.slug"
          :to="`/cakes/${cake.slug}`"
          class="block_holder"
        >
          <div class="the_image">
            <img
              :src="`/cake_images/${cake.cover_filename}.jpg`"
              :alt="cake.title"
              :loading="index < 3 ? 'eager' : 'lazy'"
              decoding="async"
            />
          </div>
          <div class="project_title">
            <strong>{{ cake.title }}</strong
            ><br />
            <!-- <span>by {{ cake.baker }}</span> -->
          </div>
        </NuxtLink>
      </div>
      <Paginator
        v-if="data && data.total > CATEGORY_PAGE_SIZE && data.cakes.length"
        class="category_paginator"
        :first="(page - 1) * CATEGORY_PAGE_SIZE"
        :rows="CATEGORY_PAGE_SIZE"
        :total-records="data.total"
        :page-link-size="3"
        template="PrevPageLink PageLinks NextPageLink CurrentPageReport"
        current-page-report-template="Showing {first}–{last} of {totalRecords} cakes"
        @page="changePage"
      />
    </div>
  </div>
</template>
<style scoped>
.category_paginator {
  margin-top: var(--gap_large);
}

.empty_state {
  color: white;
}

.sort_holder {
  font-family: var(--primary-font);
  color: #fff;
  display: flex;
  align-items: center;
  float: right;
  gap: var(--gap_small);
}

h1 {
  color: white;
  font-family: var(--primary-font);
  font-size: 2.5rem;
}

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
  background-color: #ffffff70;
  border: 1px solid transparent;
  border-radius: 30px;
  corner-shape: squircle;
  color: var(--primary-color);
  display: flex;
  flex-flow: column;
  height: 240px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.5s;

  &:hover,
  &:focus-visible {
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

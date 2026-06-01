<script setup lang="ts">
import { fetchCategoryCakes } from "~/services/category";
import { findCategoryBySlug } from "@/constants/categories";
import SelectButton from 'primevue/selectbutton';

const sortOptions = ['Popular', 'Latest'];

const sort = ref("Popular");

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const categoryMatch = computed(() =>
    findCategoryBySlug(slug.value)
);

if (!categoryMatch.value) {
    throw createError({
        statusCode: 404,
        statusMessage: "Category not found. Sadge. (please try again later)",
    });
}

const { data, pending, error } = await useAsyncData(
    () => `category:${slug.value}`,
    () => fetchCategoryCakes(categoryMatch.value!.category.slug),
    { watch: [slug] }
);

useSeoMeta({
    title: `${categoryMatch.value.category.name} Cakes - Cake Theater`,
    description: `Browse ${categoryMatch.value.category.name.toLowerCase()} cakes on Cake Theater.`,
});
</script>

<template>
    <div class="page">
        <div class="sort_holder">Sort by:
            <SelectButton v-model="sort" :options="sortOptions" />
        </div>
        <h1> {{ categoryMatch?.category.name }} Cakes</h1>
        <p class="body_text" style="color:white">{{ sort }} {{ categoryMatch?.category.name.toLowerCase() }} cakes
            🎂 <span style="opacity:0.5">This page is under construction (links don't work yet!)</span></p>

        <!-- Loading -->
        <p v-if="pending">Loading cakes...</p>

        <!-- Error -->
        <div v-else-if="error">
            <p>Unable to load featured cakes.</p>
            <pre style="white-space: pre-wrap">{{ error }}</pre>
        </div>

        <!-- Success -->

        <div v-else>

            <div class="main_card_holder">
                <NuxtLink v-for="cake in data" :key="cake.slug" to="/" class="block_holder">
                    <div class="the_image">
                        <img :src="`/cake_images/${cake.cover_filename}.jpg`" :alt="cake.title">
                    </div>
                    <div class="project_title">
                        <strong>{{ cake.title }}</strong><br>
                        <span>by {{ cake.baker }}</span>
                    </div>
                </NuxtLink>
            </div>
        </div>



    </div>
</template>
<style scoped>
.sort_holder {


    font-family: var(--primary-font);
    color: #fff;
    display: flex;
    align-items: center;
    float: right;
    gap: var(--gap_small)
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
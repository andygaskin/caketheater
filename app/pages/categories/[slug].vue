<script setup lang="ts">
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


useSeoMeta({
    title: `${categoryMatch.value.category.name} Cakes — Cake Theater`,
    description: `Browse ${categoryMatch.value.category.name.toLowerCase()} cakes on Cake Theater.`,
});
</script>

<template>
    <div class="page">
        <div class="sort_holder">Sort by:
            <SelectButton v-model="sort" :options="sortOptions" />
        </div>
        <h1 style="color:white"> {{ categoryMatch?.category.name }} Cakes</h1>
        <p class="body_text" style="color:white">{{ sort }} cakes coming soon! 🎂</p>
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
</style>
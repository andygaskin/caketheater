<script setup lang="ts">
import { findCategoryBySlug } from "@/constants/categories";

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
    <div>
        <h1 style="color:white"> {{ categoryMatch?.category.name }} Cakes</h1>
        <p class="body_text" style="color:white">Coming soon! 🎂</p>
    </div>
</template>

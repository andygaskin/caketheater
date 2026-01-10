<script setup lang="ts">
import { fetchFeatured } from "@/services/featuredApi";

const { data, pending, error } = await useAsyncData("featured", fetchFeatured);
</script>

<template>
 
    <h1>Cake Theater</h1>
    <h2>
      Where cakes take center stage.<br />
      Share your designs. Spark fresh ideas. <i class="pi pi-star" />
    </h2>
    <!-- <Button label="Verify" /> -->
    <hr />

    <!-- Loading -->
    <p v-if="pending">Loading featured cakes...</p>

    <!-- Error -->
    <div v-else-if="error">
      <p>Unable to load featured cakes.</p>
      <pre style="white-space: pre-wrap">{{ error }}</pre>
    </div>

    <!-- Success -->
    <div v-else>
      <h2>Featured Cakes</h2>

      <div
        v-for="cake in data"
        :key="cake.slug"
        style="margin-bottom: 1rem; padding: 1rem; border: 1px solid #ddd"
      >
        <NuxtLink :to="`/cakes/${cake.slug}`">
          <img
            :src="`/cake_images/${cake.cover_filename}.jpg`"
            :alt="cake.title"
            style="max-width: 200px; display: block; margin-bottom: 0.5rem"
        /></NuxtLink>
        <strong>{{ cake.title }}</strong
        ><br />
        <span>by {{ cake.baker }}</span>
      </div>
    </div>
 
</template>

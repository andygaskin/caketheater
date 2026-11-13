<script setup lang="ts">
definePageMeta({
  middleware: () => navigateTo("/", { replace: true, redirectCode: 302 }),
});
</script>

<template>
  <div />
</template>

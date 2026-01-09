export type FeaturedCake = {
  slug: string;
  title: string;
  baker: string;
  cover_filename: string;
};

import featuredMock from "@/mock/featured.json";

export async function fetchFeatured(): Promise<FeaturedCake[]> {
  if (import.meta.dev) {
    return featuredMock as FeaturedCake[];
  }

  return await $fetch<FeaturedCake[]>(
    "https://caketheater.com/api/featured.php",
  );
}

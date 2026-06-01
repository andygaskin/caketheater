import categoryMock from "@/mock/categoryMock.json";

export type CategoryCake = {
  slug: string;
  title: string;
  baker: string;
  cover_filename: string;
};

export async function fetchCategoryCakes(
  slug: string,
): Promise<CategoryCake[]> {
  if (import.meta.dev) {
    return categoryMock as CategoryCake[];
  }

  return await $fetch<CategoryCake[]>(
    `https://caketheater.com/api/category.php?slug=${encodeURIComponent(slug)}`,
  );
}

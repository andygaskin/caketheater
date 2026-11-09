import categoryMock from "@/mock/categoryMock.json";

export type CategoryCake = {
  slug: string;
  title: string;
  baker: string;
  cover_filename: string;
};

export type CategorySort = "popular" | "latest";
export const CATEGORY_PAGE_SIZE = 24;
export type CategoryPage = {
  cakes: CategoryCake[];
  total: number;
  page: number;
  pageSize: number;
};

export async function fetchCategoryCakes(
  slug: string,
  page = 1,
  sort: CategorySort = "popular",
): Promise<CategoryPage> {
  if (import.meta.dev) {
    // Fixtures have no dates or scores; reverse their order for the Latest preview.
    const cakes = sort === "latest" ? [...categoryMock].reverse() : categoryMock;
    return {
      cakes: cakes.slice((page - 1) * CATEGORY_PAGE_SIZE, page * CATEGORY_PAGE_SIZE),
      total: cakes.length,
      page,
      pageSize: CATEGORY_PAGE_SIZE,
    };
  }

  return await $fetch<CategoryPage>(
    "https://caketheater.com/api/category.php",
    { query: { slug, page, sort } },
  );
}

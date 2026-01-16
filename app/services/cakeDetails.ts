import cakeDetailMock from "@/mock/cakeDetailsMock.json";

export type CakeDetailApiResponse = {
  cake: {
    id: number;
    slug: string;
    title: string;
    description: string;
    created_at: string;
    cover_image_id: number;
    baker: {
      display_name: string;
      country: string;
    };
    images: {
      id: number;
      filename: string;
      description: string;
      sort_order: number;
      is_cover: boolean;
    }[];
  } | null;
  error?: string;
};

export type CakeDetail = {
  id: number;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  coverImageId: number;
  baker: {
    displayName: string;
    country: string;
  };
  images: {
    id: number;
    filename: string;
    description: string;
    sortOrder: number;
    isCover: boolean;
  }[];
};

function normalizeCake(
  apiCake: NonNullable<CakeDetailApiResponse["cake"]>,
): CakeDetail {
  return {
    id: apiCake.id,
    slug: apiCake.slug,
    title: apiCake.title,
    description: apiCake.description,
    createdAt: apiCake.created_at,
    coverImageId: apiCake.cover_image_id,
    baker: {
      displayName: apiCake.baker.display_name,
      country: apiCake.baker.country,
    },
    images: apiCake.images.map((img) => ({
      id: img.id,
      filename: img.filename,
      description: img.description,
      sortOrder: img.sort_order,
      isCover: img.is_cover,
    })),
  };
}

export async function fetchCakeDetail(slug: string): Promise<CakeDetail> {
  const data: CakeDetailApiResponse = import.meta.dev
    ? (cakeDetailMock as CakeDetailApiResponse)
    : await $fetch<CakeDetailApiResponse>(
        `https://caketheater.com/api/cake-detail.php?slug=${encodeURIComponent(slug)}`,
      );

  if (!data.cake) {
    throw new Error(data.error || "Cake not found.");
  }

  return normalizeCake(data.cake);
}

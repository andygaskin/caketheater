export type CategoryChild = {
  name: string;
  slug: string;
};

export type CategoryGroup = {
  name: string;
  slug: string;
  children: CategoryChild[];
};

export const categoryMenu: CategoryGroup[] = [
  {
    name: "Occasion",
    slug: "occasion",
    children: [
      { name: "Birthday", slug: "birthday" },
      { name: "Baby Shower", slug: "baby-shower" },
      { name: "Graduation", slug: "graduation" },
      { name: "Wedding", slug: "wedding" },
      { name: "Baptism", slug: "baptism" },
      { name: "Communion", slug: "communion" },
      { name: "Anniversary", slug: "anniversary" },
    ],
  },
  {
    name: "Theme",
    slug: "theme",
    children: [
      { name: "Characters / Culture", slug: "characters-pop-culture" },
      { name: "Animals", slug: "animals" },
      { name: "Princess", slug: "princess" },
      { name: "Sports", slug: "sports" },
      { name: "Fantasy / Sci-Fi", slug: "fantasy-sci-fi" },
    ],
  },
  {
    name: "Technique",
    slug: "technique",
    children: [
      { name: "Cupcakes", slug: "cupcakes" },
      { name: "Bundt Cakes", slug: "bundt-cakes" },
      { name: "Cake Pops", slug: "cake-pops" },
      { name: "Sculpted Cakes", slug: "sculpted-cakes" },
      { name: "Fondant", slug: "fondant" },
    ],
  },
  {
    name: "Holiday",
    slug: "holiday",
    children: [
      { name: "Halloween", slug: "halloween" },
      { name: "Christmas", slug: "christmas" },
      { name: "Valentine's Day", slug: "valentines-day" },
      { name: "Easter", slug: "easter" },
    ],
  },
];

export function findCategoryBySlug(slug: string) {
  for (const group of categoryMenu) {
    const category = group.children.find((child) => child.slug === slug);

    if (category) {
      return {
        group,
        category,
      };
    }
  }

  return null;
}

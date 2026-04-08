<script setup lang="ts">
defineProps<{
  showIntro?: boolean | null;
}>();





const categoryMenu = [
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
      { name: "Valentine's Day", slug: "valentines" },
      { name: "Easter", slug: "easter" },
    ],
  },
];


</script>

<template>
  <header class="site-header">

    <!--menu-->
    <nav>

      <div class="menu_item_holder">
        <div class="menu_group">
          <button class="menu_item" style="anchor-name: --menu_item_cakes" popovertarget="menu_dropdown">Cakes <i
              class="pi pi-chevron-down" /></button>
          <button class="menu_item" style="anchor-name: --menu_item_tiers" popovertarget="menu_dropdown_tiers">Tiers <i
              class="pi pi-chevron-down" /></button>
        </div>

        <NuxtLink to="/" class="logo"><img src="@/assets/images/logo.webp" alt="Cake Theater logo" /></NuxtLink>

        <div class="menu_group">
          <button class="menu_item" popovertarget="menu_dropdown">Baker Directory</button>
          <button class="menu_item" popovertarget="menu_dropdown">Market</button>
        </div>
      </div>
      <div id="menu_dropdown" popover style="position-anchor: --menu_item_cakes" class="menu_dropdown">

        <div v-for="group in categoryMenu" :key="group.slug">
          <h3>{{ group.name }}</h3>

          <ul>
            <li v-for="item in group.children" :key="item.slug">
              <NuxtLink :to="`/categories/${group.slug}/${item.slug}`">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div id="menu_dropdown_tiers" style="position-anchor: --menu_item_tiers" popover class="menu_dropdown">
        <ul>
          <li>
            <NuxtLink to="/tiers/leaderboard">
              Leaderboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tiers/popular">
              Popular
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/tiers/latest">
              Latest additions
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>


    <Transition name="intro">
      <div v-show="showIntro" class="text_holder">
        <h1>Where cakes take center stage</h1>
        <div class="flex_align tagline">
          <h2>Share your designs</h2>
          <i class="pi pi-star pi-spin mobile_hide" />
          <h2>Spark fresh ideas</h2>
        </div>
      </div>
    </Transition>


    <!--Start plank-->
    <div class="plank">
      <img src="@/assets/images/plank.webp" alt="plank" />
    </div>


  </header>
</template>
<style scoped>
.logo {
  margin-left: var(--gap_large);
  margin-right: var(--gap_large);

}


.menu_item_holder {

  display: flex;

}

.menu_group {
  display: flex;
  align-items: flex-end;
  column-gap: 50px;

  /* outline: 1px solid orange; */
}

.menu_item {
  /* outline: 1px solid orange; */
  border-radius: 5px;
  padding: var(--gap_small);
  margin-top: 20px;
  color: #fff;
  border: none;
  background: none;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.418);

  &:hover {
    /* text-decoration: underline; */
    background: rgba(255, 255, 255, 0.123);

  }

  i {
    font-size: 1rem;
    color: #a97fca;
    /* text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.418); */
  }

}

::backdrop {
  /* background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.5px); */
}

.menu_dropdown {
  font-family: "Lato", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-top: var(--gap_small);
  padding: var(--gap_medium);
  background: #fff;
  border-radius: 30px;
  box-shadow: .6px 1.1px 3.9px #00000016, 5px 9px 31px #0000002f;
  position: absolute;
  border: none;

  position-area: bottom span-right;
  corner-shape: squircle;

  transition: all 0.1s;

  &:popover-open {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: var(--gap_large);
    transform: translateY(0);

    @starting-style {
      /* opacity: 0; */
      transform: translateY(-5px);
    }


    ul {
      list-style: none;
      padding-left: 0;
      margin-top: var(--gap_small);
      margin-bottom: var(--gap_medium);
      color: #231f20;
      width: 100%;
    }

    a {
      text-decoration: none;
      color: purple;

      &:hover {
        text-decoration: underline;
      }
    }

  }


}

.plank {
  @media (width < 600px) {
    height: 65px;
    width: 100%;
  }

  & img {
    width: 100%;

    @media (width < 850px) {
      height: 100%;
      object-fit: cover;
      object-position: left;
    }
  }
}

.tagline {
  @media (width<650px) {
    flex-direction: column;
    margin-top: var(--gap_medium);
  }
}



.text_holder {
  height: auto;
  transition: all 1s ease-in-out;
  text-align: center;
  margin-bottom: var(--gap_large);
  margin-top: var(--gap_medium);
}

/* .intro-enter-active,
.intro-leave-active {
  overflow: hidden;
} */

.intro-enter-from,
.intro-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
  filter: blur(0.5rem);
}

.intro-enter-to,
.intro-leave-from {
  max-height: 500px;
  opacity: 1;
  margin-bottom: var(--gap_large);
  margin-top: var(--gap_medium);
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--gap_large);
}

h1 {
  /* font-family: Usual, var(--primary-font); */
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #fff;
  font-size: 2.8rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 45px;
}

h2 {
  /* font-family: var(--primary-font); */
  font-family: Georgia, "Times New Roman", Times, serif;

  font-size: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
}
</style>

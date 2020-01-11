<template>
  <div>
    <listings type="tours" />
  </div>
</template>
<script>
import Listings from "~/components/Listings";
export default {
  components: { Listings },
  // nuxtI18n: {
  //   paths: {
  //     en: "/listings/excursions",
  //     ru: "/объявления/туры"
  //   }
  // }
};
</script>
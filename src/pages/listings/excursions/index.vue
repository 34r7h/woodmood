<template>
  <div>
    <listings type="excursions" />
  </div>
</template>
<script>
import Listings from "~/components/Listings";
export default {
  components: { Listings },
  name:'excursions'
  // nuxtI18n: {
  //   paths: {
  //     en: "/listings/excursions",
  //     ru: "/объявления/экскурсии"
  //   }
  // }
};
</script>
<template>
  <div>
    <offer :id="$route.params.id" type="tours" />
  </div>
</template>
<script>
import Offer from "~/components/Offer";
export default {
  components: { Offer },
  // nuxtI18n: {
  //   paths: {
  //     en: "/offer/tours/:id",
  //     ru: "/предлагает/туры/:id"
  //   }
  // }
};
</script>
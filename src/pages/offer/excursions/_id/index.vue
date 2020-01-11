<template>
  <div>
    <offer :id="$route.params.id" type="excursions" />
  </div>
</template>
<script>
import Offer from "~/components/Offer";
export default {
  components: { Offer },
  // nuxtI18n: {
  //   paths: {
  //     en: '/offer/excursions/:id',
  //     ru: '/предлагает/экскурсии/:id'
  //   }
  // }
};
</script>
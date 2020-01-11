<template>
    <v-card flat>
      <v-card-text>
        <vue-simple-markdown :source="$store.state.site.partners"></vue-simple-markdown>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
  // nuxtI18n: {
  //   paths: {
  //     en: '/partners',
  //     ru: '/партнеры'
  //   }
  // }
}
</script>
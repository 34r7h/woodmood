<template>
  <v-card class="ma-2">
    <v-card-text>
      <vue-simple-markdown :source="$store.state.site.contact"></vue-simple-markdown>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  async asyncData ({ store }) {
    await store.dispatch('i18n/setRouteParams', {
      en: { slug: 'my-post' },
      ru: { slug: 'контакт' }
    })
    return {
      data: true
    }
  }
//   nuxtI18n: {
//     paths: {
//       en: "/contact",
//       ru: "/контакт"
//     }
//   }
};
</script>
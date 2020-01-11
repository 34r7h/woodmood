<template>
  <div class="d-flex align-center">
    <v-btn class="me-2 secondary--text" icon>
      <a target="blank" :href="$store.state.site.fb"><v-icon>mdi-facebook</v-icon></a>
    </v-btn>
    <v-btn class="me-4  secondary--text" icon>
      <a target="blank" :href="$store.state.site.insta"><v-icon>mdi-instagram</v-icon></a>
    </v-btn>
    <span class="me-3  secondary--text">
      <router-link :to="localePath({ name: 'contact'})" ><v-btn class=" secondary--text" outlined>Contact</v-btn></router-link>
    </span>
  </div>
</template>

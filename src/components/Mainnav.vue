<template>
  <div>
    <v-toolbar flat class="d-flex">
      <v-toolbar-items class="d-flex flex-wrap justify-space-around">
        <v-btn class="flex-grow-1" style="min-width:120px" text v-for="(item, itemKey) in menuItems" :key="itemKey">
            <router-link :to="item.link" >{{item.name}}
            </router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

  </div>
</template>
<script>
export default {
    data () {
        return {
            menuItems: [
                {name: 'tours', link: '/listings/tours'},
                {name: 'excursions', link: '/listings/excursions'},
                {name: 'transfers', link: '/transfers'},
                {name: 'about', link: '/about'},
                {name: 'partners', link: '/partners'},
            ]
        }
    }
}
</script>
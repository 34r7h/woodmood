<template>
  <div style="width:100%;">
    <v-toolbar style="width:100%;" flat class="d-flex">
      <v-toolbar-items style="width:100%;" class="d-flex" :class="sidebar ? 'flex-column' : ''">
        <v-btn
          style="flex: 1; min-height: 60px; width:100%;"
          text
          v-for="(item, itemKey) in menuItems"
          :key="itemKey"
        >
          <router-link :to="item.link">{{item.name}}</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: ['sidebar'],
  data() {
    return {
      menuItems: [
        { name: "tours", link: "/listings/tours" },
        { name: "excursions", link: "/listings/excursions" },
        { name: "transfers", link: "/transfers" },
        { name: "about", link: "/about" },
        { name: "partners", link: "/partners" }
      ]
    };
  }
};
</script>
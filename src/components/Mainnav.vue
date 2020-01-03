<template>
  <div style="width:100%;">
    <v-toolbar style="width:100%;" flat class="d-flex">
      <v-toolbar-items style="width:100%;" class="d-flex" :class="sidebar ? 'flex-column align-start' : ''">
        <router-link v-for="(item, itemKey) in menuItems" :key="itemKey" :to="item.link" style="flex: 1; min-height: 60px;">
          <v-btn class="secondary--text" text style="flex: 1; min-height: 60px; width:100%;">
            <v-icon>mdi-{{item.icon}}</v-icon>
            {{item.name}}
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  props: ["sidebar"],
  data() {
    return {
      menuItems: [
        { name: "tours", link: "/listings/tours", icon: "camera" },
        { name: "excursions", link: "/listings/excursions", icon: "rv-truck" },
        { name: "transfers", link: "/transfers", icon: "transit-transfer" },
        { name: "about", link: "/about", icon: "information" },
        { name: "partners", link: "/partners", icon: "handshake" }
      ]
    };
  }
};
</script>
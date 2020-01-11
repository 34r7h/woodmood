<template>
  <div style="width:100%;">
    <v-toolbar style="width:100%;" flat class="d-flex">
      <v-toolbar-items
        style="width:100%;"
        class="d-flex"
        :class="sidebar ? 'flex-column align-start' : ''"
      >
        <nuxt-link
          v-for="(item, itemKey) in menuItems"
          :key="itemKey"
          :to="localePath(item.link)"
          style="flex: 1; min-height: 60px;"
        >
          <v-btn class="secondary--text" text style="flex: 1; min-height: 60px; width:100%;">
            <v-icon>mdi-{{item.icon}}</v-icon>
            {{$t(item.name)}}
          </v-btn>
        </nuxt-link>
        <v-btn v-if="$store.state.user" @click="$store.dispatch('logout')">Sign Out</v-btn>
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
        { name: "tours", link: "listings-tours", icon: "camera" },
        { name: "excursions", link: "listings-excursions", icon: "rv-truck" },
        { name: "transfers", link: "transfers", icon: "transit-transfer" },
        { name: "about", link: "about", icon: "information" },
        { name: "partners", link: "partners", icon: "handshake" }
      ]
    };
  }
};
</script>
<i18n>
{
  "ru": {
    "tours": "туры",
    "excursions": "экскурсии",
    "contact": "контакт",
    "about": "около",
    "transfers": "трансфер",
    "partners": "партнеры"
  }
}
</i18n>
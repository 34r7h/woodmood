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
  },
  "en": {
    "tours": "tours",
    "featured": "featured",
    "excursions": "excursions",
    "contact": "contact",
    "about": "about",
    "transfers": "transfers",
    "partners": "partners",
    "tour type": "tour type",
    "type": "type",
    "from": "from",
    "to": "to",
    "spring": "spring",
    "summer": "summer",
    "fall": "fall",
    "winter": "winter",
    "more info": "more info",
    "reserve": "reserve",
    "seasons": "seasons",
    "filters": "filters",
    "search transfers": "search transfers",
    "cost": "cost",
    "request to book": "request to book",
    "name": "name",
    "email": "email",
    "phone": "phone",
    "number of people": "number of people",
    "date": "date",
    "send request": "send request",
    "people": "people",
    "close": "close",
    "Thank you": "Thank yo",
    "We will contact you": "We will contact you"
  }
}
</i18n>
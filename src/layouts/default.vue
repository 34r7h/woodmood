<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>
        <router-link to="/">{{$store.state.site[$store.state.lang].name || "🇬🇪 Tours 🇬🇪"}}</router-link>
      </v-toolbar-title>
      <v-spacer />
      <div class="d-none d-sm-flex">
        <contact />
      </div>
      <nuxt-link
        :to="$route.name.indexOf('___en') > -1 ? switchLocalePath('ru') : switchLocalePath('en')"
      >
        <v-btn @click="lang($route.name.includes('___ru') ? 'en' : 'ru')" text small  class="d-flex justify-space-between px-3">
          <i class="mx-1" :style="'' + $route.name.indexOf('___ru') > -1 ? 'font-size: 200%;' : ''">🇷🇺</i>
          <i class="mx-1" :style="'' + $route.name.indexOf('___en') > -1 ? 'font-size: 200%;' : ''">🇬🇧</i>
        </v-btn>
      </nuxt-link>
      <v-btn class="d-flex d-sm-none" icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <mainnav
        style="width:100%;"
        class="d-none d-sm-flex"
        v-if="$route.path !== '/' && $route.path !== '/ru'"
      />
      <nuxt />
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item>
          <contact />
        </v-list-item>
      </v-list>
      <mainnav style="width:100%;" sidebar="true" />
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span
        @click="admin++; admin > 2 ? $router.push('admin') : null"
      >&copy; {{(new Date()).getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import VueSimpleMarkdown from "vue-simple-markdown";
import "vue-simple-markdown/dist/vue-simple-markdown.css";

Vue.use(VueSimpleMarkdown);
import Contact from "../components/Contact";
import Mainnav from "../components/Mainnav";

export default {
  components: { Contact, Mainnav },
  created() {
    this.$vuetify.theme.dark = false;
    // this.$vuetify.theme.dark = new Date().getHours() < 9 || new Date().getHours() > 21 ? true : false;
    this.$route.name.includes('___ru') ? this.$store.commit('setState', {type: 'lang', data: 'ru'}) : this.$store.commit('setState', {type: 'lang', data: 'en'})
    this.$store.dispatch("get", this.$store.state);
    this.$store.dispatch("getSite", this.$store.state);
  },
  methods: {
    lang(lang) {
      return this.$store.commit('setState', {type: 'lang', data: lang}), lang
    }
  },
  data() {
    return {
      admin: 0,
      clipped: false,
      dark: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  }
};
</script>
<style>
.v-toolbar__content {
  width: 100%;
}
.v-banner__text {
  width: 100% !important;
}
.v-banner__wrapper {
  padding: 8px !important;
}
a,
router-link {
  text-decoration: none;
}
</style>
<i18n>
{
  "ru": {
    "tours": "туры",
    "featured": "признакам",
    "excursions": "экскурсии",
    "contact": "контакт",
    "about": "около",
    "transfers": "трансфер",
    "partners": "партнеры",
    "tour type": "тур тип",
    "type": "тип",
    "from": "от",
    "to": "в",
    "spring": "весна",
    "summer": "летом",
    "fall": "осень",
    "winter": "зима",
    "more info": "больше информации",
    "reserve": "zabronirovat'",
    "seasons": "сезоны",
    "filters": "фильтры",
    "search transfers": "поисковые переводы",
    "cost": "цена",
    "request to book": "запрос на книгу",
    "name": "имя",
    "email": "Эл. адрес",
    "phone": "Телефон",
    "number of people": "число людей",
    "date": "Дата",
    "send request": "послать запрос",
    "people": "люди",
    "close": "blizko",
    "Thank you": "Спасибо",
    "We will contact you": "мы свяжемся с вами"
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
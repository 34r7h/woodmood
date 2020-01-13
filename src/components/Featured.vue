<template>
  <div>
    <slider :slides="featuredObject" v-if="$route.path === '/' || $route.path === '/ru' " />
    <mainnav v-if="$route.path === '/' || $route.path === '/ru'" style="width:100%;" class="d-none d-sm-flex" />
    <div class="pa-2" v-for="(feature, featureKey) in featuredObject" :key="featureKey">
      <h2>{{$t('featured').toUpperCase()}} {{$t(featureKey).toUpperCase()}}</h2>
      <v-card
        :flat="Boolean(nodetails)"
        class="mb-3"
        v-for="(item, itemIndex) in feature"
        :key="itemIndex"
      >
        <v-card-title v-if="nodetails">{{$store.state.lang === 'en' ? item.name : item.ru.name || item.name}}</v-card-title>
        <v-img
            :aspect-ratio="16/9"
            v-if="nodetails"
            class="flex-grow-1 flex-shrink-1"
            style="max-height: 400px; flex:2; width: 100%; min-height: 180px; min-width: 180px;"
            :src="item.image"
          ></v-img>

        <div
          class="d-flex flex-wrap"
          :class="!nodetails && itemIndex % 2 === 0 ? 'flex-row-reverse' : ''"
        >
          <v-img
            :aspect-ratio="16/9"
            v-if="!nodetails"
            class="flex-grow-1 flex-shrink-1"
            style="flex:2; width: 100%; min-height: 180px; min-width: 180px;"
            :src="item.image"
          ></v-img>
          <div
            :class="nodetails ? 'align-center justify-space-between d-flex flex-wrap pa-0 mb-2' : 'flex-shrink-1'"
            style="width:100%; min-width: 180px; flex: 1"
          >
            <v-card-title class="mb-4" v-if="!nodetails">{{$store.state.lang === 'en' ? item.name : item.ru.name || item.name}}</v-card-title>
            <v-card-subtitle
              style="width:100%;"
              class="d-flex align-center flex-wrap justify-space-between"
            >
              <b class="primary--text">{{$store.state.lang === 'en' ? item.location : item.ru.location || item.location}}</b>
              <span v-for="(season, seasonIndex) in item.season" :key="seasonIndex">
                <v-icon class=" accent--text" x-small>mdi-{{$store.state.icons[season]}}</v-icon>
                {{$t(season)}}
              </span>
            </v-card-subtitle>
            <v-card-subtitle class="px-4 py-0">{{$t("tour type")}}: {{item.type}}</v-card-subtitle>
            <v-card-text v-if="!nodetails">
              <vue-simple-markdown :source="($store.state.lang === 'en' ? item.details : item.ru.details || item.details).substring(0,280) + '...'"></vue-simple-markdown>
            </v-card-text>
            <v-card-title class>{{$t("from")}} ${{item.cost}}</v-card-title>
            <v-card-actions :class="nodetails ? 'pa-0' : 'pa-3'"  class=" d-flex justify-space-between flex-wrap" style="width:100%">

              <nuxt-link :to="localePath({ name: 'offer-' + featureKey + '-id', params: { id: item.id } })" class="flex-grow-1 d-flex">
                <v-btn class="secondary flex-grow-1 ma-1">{{$t("more info")}}</v-btn>
              </nuxt-link>
              <v-btn v-if="!nodetails"
                @click="$store.commit('setState', {type: 'overlayFeatured', data: true}); book = {id: item.id, type: featureKey}"
                class="success flex-grow-1 ma-1"
              >{{$t("reserve")}}</v-btn>
            </v-card-actions>
          </div>
        </div>
        <hr class="my-2" v-if="nodetails" />
      </v-card>
      <v-overlay :value="$store.state.overlayFeatured">
      <v-card light class="ma-2 pa-4">
        <v-btn text small @click="$store.commit('setState', {type: 'overlayFeatured',
        data: false}); book = {}">
          <v-icon small>mdi-close</v-icon>{{$t("close")}}
        </v-btn>
        <booking v-if="book.type && book.id" :type="book.type" :item="$store.state[book.type][book.id]" />
      </v-card>
    </v-overlay>
    </div>
    
  </div>
</template>
<script>
import _ from "lodash";
import Slider from "./Slider";
import Mainnav from "./Mainnav";
import Booking from "./Booking";

export default {
  components: { Slider, Mainnav, Booking },
  computed: {
    featuredObject() {
      return {
        tours: _.orderBy(
          Object.values(this.$store.state.tours).filter(x => x.featured),
          "id"
        ).reverse(),
        excursions: _.orderBy(
          Object.values(this.$store.state.excursions).filter(x => x.featured),
          "id"
        ).reverse()
      };
    }
  },
  data() {
    return {
      overlay: false,
      book: {}
    };
  },
  props: ["nodetails"]
};
</script>
<i18n>
{
  "ru": {
    "tours": "туры",
    "featured": "избранные",
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
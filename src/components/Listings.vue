<template>
  <v-container v-if="$store.state[type]" fluid class="grey lighten-5">

    <div class="d-flex justify-space-between align-center">
      <h1>{{$t(type).toUpperCase()}}</h1>
      <v-btn
        class="d-flex d-sm-none"
        @click="$store.commit('setState', {type: 'overlayFilter', data: true})"
      >{{$t("filters").toUpperCase()}}</v-btn>
    </div>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <div class outlined tile>
          <div class="d-flex flex-wrap">
            <v-card
              :aspect-ratio="16/9"
              :style="i === 0 ? 'min-width: 100%' : ''"
              :class="i === 0 ? 'mb-1' : 'ma-1'"
              class="flex-shrink-1"
              style="min-height: 240px; min-width: 240px; flex: 1"
              v-for="(item, i) in list"
              :key="i"
            >
              <nuxt-link :to="localePath({ name: 'offer-' + type + '-id', params: { id: item.id } })">
                <v-img
                  :aspect-ratio="16/9"
                  class="d-flex align-end"
                  height="100%"
                  :src="item.image"
                >
                  <v-card
                    flat
                    class="d-flex flex-wrap ma-2 px-2 flex-shrink-1 justify-space-between align-center"
                  >
                    <div class="flex-grow-1 d-flex flex-wrap align-center justify-space-around">
                      <h2>{{item.name.toUpperCase()}}</h2>
                      <div class="mx-4">{{$t("from")}} ${{item.cost}}</div>
                      <v-btn small class="my-2 success flex-grow-1" @click.prevent="$store.commit('setState', {type: 'overlayListings', data: true}); book = {id: item.id, type: type}">{{$t("reserve")}}</v-btn>
                    </div>
                    
                  </v-card>
                </v-img>
              </nuxt-link>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="4" class="d-none d-sm-flex">
        <v-banner style="width: 100%;" sticky class="pa-2" outlined tile>
          <filters style="width: 100%" :type="type" />
        </v-banner>
      </v-col>
    </v-row>
    <v-overlay :value="$store.state.overlayFilter">
      <v-card light class="ma-2 pa-4">
        <v-btn x-small @click="$store.commit('setState', {type: 'overlayFilter', data: false})">
          <v-icon small>mdi-close</v-icon>Close
        </v-btn>
        <filters style="width: 100%" :type="type" />
      </v-card>
    </v-overlay>
    <v-overlay :value="$store.state.overlayListings">
      <v-card light class="ma-2 pa-4">
        <v-btn text small @click="$store.commit('setState', {type: 'overlayListings', data: false}); book = {}">
          <v-icon small>mdi-close</v-icon>Close
        </v-btn>
        <booking v-if="book.type && book.id" :type="book.type" :item="$store.state[book.type][book.id]" />
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
import _ from "lodash";
import Filters from "./Filters";
import Booking from "./Booking";


export default {
  components: { Filters, Booking },
  computed: {
    list() {
      return _.orderBy(
        Object.values(this.$store.state[this.type]).filter((x, xKey) => {
          let toCheck = this.$store.state.filtered[this.type];
          return (
            JSON.stringify(x)
              .toLowerCase()
              .indexOf(toCheck.search.toLowerCase()) > -1 &&
            JSON.stringify(x.location)
              .toLowerCase()
              .indexOf(toCheck.location.toLowerCase()) > -1 &&
            JSON.stringify(x.type)
              .toLowerCase()
              .indexOf(toCheck.type.toLowerCase()) > -1 &&
            (x.cost > toCheck.cost[0] && x.cost < toCheck.cost[1]) &&
            (toCheck.seasons.length === 0 ||
              toCheck.seasons.some(r => x.season.includes(r)))
          );
        }),
        this.sort
      ).reverse();
    }
  },
  data() {
    return {
      book: {},
      sort: "id",
      overlay: false
    };
  },
  props: ["type"],
  mounted() {
    this.$store.commit("setState", {
      type: "overlays",
      data: { listings: false }
    });
  }
};
</script>

<style>
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
    "from": "из",
    "spring": "весна",
    "summer": "летом",
    "fall": "осень",
    "winter": "зима",
    "more info": "больше информации",
    "reserve": "zabronirovat'",
    "seasons": "сезоны",
    "filters": "фильтры"
  }
}
</i18n>
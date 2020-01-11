<template>
  <div v-if="$store.state[type][id]">
    <v-container fluid class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12" sm="7">
          <v-card class="d-flex flex-column pa-2 mb-2">
            <v-card class="px-1 d-flex justify-space-between align-center flex-wrap mb-2 d-sm-none">
              <div class="d-flex flex-column justify-center">
                <v-card-title>{{$store.state[type][id].name.toUpperCase()}}</v-card-title>
                <v-card-subtitle>{{$store.state[type][id].location}} from ${{$store.state[type][id].cost}}</v-card-subtitle>
              </div>
              <v-spacer />
              <v-card-actions class="d-flex flex-grow-1">
                <v-btn @click="overlays()" class="flex-grow-1 success" x-large>{{$t("reserve").toUpperCase()}}</v-btn>
              </v-card-actions>
            </v-card>
            <v-img :src="$store.state[type][id].image"></v-img>
            <v-card-subtitle class="d-flex justify-space-between align-center pa-0 px-4">
              {{$t("seasons").toUpperCase()}}:
              <div
                small
                class="label pa-0 ma-0"
                v-for="(season, seasonIndex) in $store.state[type][id].season"
                :key="seasonIndex"
              >
                <v-icon class="accent--text" small>mdi-{{$store.state.icons[season]}}</v-icon>
                {{$t(season)}}
              </div>
            </v-card-subtitle>
            <v-card-subtitle class="primary--text pa-4 pb-0">
              <h2>{{$store.state[type][id].location}} - {{$store.state[type][id].name}}</h2>
            </v-card-subtitle>

            <v-card-subtitle>{{$t("type").toUpperCase()}}: {{$t($store.state[type][id].type).toUpperCase()}} </v-card-subtitle>

            <v-card-text>
              <vue-simple-markdown :source="$store.state[type][id].details"></vue-simple-markdown>
            </v-card-text>
            <v-card-actions>
              <v-btn width="200px" @click="overlays()" class="success x-large" x-large>{{$t("reserve")}}</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5" class="px-1">
          <v-card class="px-0 justify-space-between align-center flex-wrap mb-2 d-none d-sm-flex">
            <div class="d-flex flex-column justify-center">
              <v-card-title class="pa-0 px-2">{{$store.state[type][id].name.toUpperCase()}}</v-card-title>
              <v-card-subtitle
                class="pa-2"
              >{{$store.state[type][id].location}} {{$t("from")}} ${{$store.state[type][id].cost}}</v-card-subtitle>
            </div>
            <v-spacer />
            <v-card-actions class="d-flex flex-grow-1">
              <v-btn @click="overlays()" class="flex-grow-1 success" x-large>{{$t("reserve")}}</v-btn>
            </v-card-actions>
          </v-card>
          <v-card flat class="pa-1">
            <featured nodetails="true" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="$store.state.overlayOffer">
      <v-card light class="ma-2 pa-4">
        <v-btn text small @click="overlays()">
          <v-icon small>mdi-close</v-icon>{{$t("close")}}
        </v-btn>
        <booking :item="$store.state[type][id]" />
      </v-card>
    </v-overlay>
  </div>
</template>
<script>
import Featured from "./Featured";
import Booking from "./Booking";

export default {
  components: { Featured, Booking },
  methods: {
    overlays() {
      this.$store.commit("setState", {
        type: "overlayOffer",
        data: !this.$store.state.overlayOffer
      });
    }
  },
  mounted() {
    this.$store.commit("setState", {
      type: "overlayOffer",
      data: false
    });
  },
  props: ["type", "id"]
};
</script>
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
    "close": "blizko"
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
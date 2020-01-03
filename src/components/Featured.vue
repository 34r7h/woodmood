<template>
  <div>
    <slider :slides="featuredObject" v-if="$route.name === 'index'" />
    <mainnav v-if="$route.name === 'index'" style="width:100%;" class="d-none d-sm-flex" />
    <div class="pa-2" v-for="(feature, featureKey) in featuredObject" :key="featureKey">
      <h2>Featured {{featureKey}}</h2>
      <v-card
        :flat="Boolean(nodetails)"
        class="mb-3"
        v-for="(item, itemIndex) in feature"
        :key="itemIndex"
      >
        <div
          class="d-flex flex-wrap"
          :class="!nodetails && itemIndex % 2 === 0 ? 'flex-row-reverse' : ''"
        >
          <v-card-title v-if="nodetails">{{item.name}}</v-card-title>
          <v-img
            :aspect-ratio="16/9"
            class="flex-grow-1 flex-shrink-1"
            style="max-height: 400px; flex:2; width: 100%; min-height: 180px; min-width: 180px;"
            :src="item.image"
          ></v-img>
          <div
            :class="nodetails ? 'align-center justify-space-between d-flex flex-wrap pa-0 mb-2' : 'flex-shrink-1'"
            style="width:100%; min-width: 180px; flex: 1"
          >
            <v-card-title class="mb-4" v-if="!nodetails">{{item.name}}</v-card-title>
            <v-card-subtitle
              style="width:100%;"
              class="d-flex align-center flex-wrap justify-space-between"
            >
              <b class="primary--text">{{item.location}}</b>
              <span v-for="(season, seasonIndex) in item.season" :key="seasonIndex">
                <v-icon class=" accent--text" x-small>mdi-{{$store.state.icons[season]}}</v-icon>
                {{season}}
              </span>
            </v-card-subtitle>
            <v-card-subtitle class="px-4 py-0">Tour Type: {{item.type}}</v-card-subtitle>
            <v-card-text v-if="!nodetails">
              <vue-simple-markdown :source="item.details.substring(0,280) + '...'"></vue-simple-markdown>
            </v-card-text>
            <v-card-title class>From ${{item.cost}}</v-card-title>
            <v-card-actions class="pa-3 d-flex justify-space-between" style="width:100%">

              <router-link :to="'/offer/'+ featureKey+ '/' + item.id" class="flex-grow-1 d-flex ma-1">
                <v-btn class="secondary flex-grow-1 ma-1">More Info</v-btn>
              </router-link>
              <v-btn v-if="!nodetails"
                @click="$store.commit('setState', {type: 'overlayFeatured', data: true}); book = {id: item.id, type: featureKey}"
                class="success flex-grow-1"
              >Reserve Now</v-btn>
            </v-card-actions>
          </div>
        </div>
        <hr v-if="nodetails" />
      </v-card>
      <v-overlay :value="$store.state.overlayFeatured">
      <v-card light class="ma-2 pa-4">
        <v-btn text small @click="$store.commit('setState', {type: 'overlayFeatured',
        data: false}); book = {}">
          <v-icon small>mdi-close</v-icon>Close
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
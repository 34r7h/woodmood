<template>
  <div>
    <slider :slides="featuredObject" v-if="$route.name === 'index'" />
    <v-container v-for="(feature, featureKey) in featuredObject" :key="featureKey">
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
            style="max-height: 320px; max-width: 100%; width: 40%; min-height: 180px; min-width: 320px;"
            :src="item.image"
          ></v-img>
          <div
            :class="nodetails ? 'align-center justify-space-between d-flex flex-wrap pa-0 mb-2' : 'flex-grow-1 flex-shrink-1'"
            :style="nodetails ? 'width: 100%' : 'width: 60%'"
            style="min-width: 240px; max-width:100%; "
          >
            <v-card-title class="mb-4" v-if="!nodetails">{{item.name}}</v-card-title>
            <v-card-subtitle style="width:100%;" class="d-flex align-center justify-space-between">
              <b>{{item.location}}</b>
              <span v-for="(season, seasonIndex) in item.season" :key="seasonIndex">
                <v-icon x-small>mdi-{{$store.state.icons[season]}}</v-icon>
                {{season}}
              </span>
            </v-card-subtitle>
            <v-card-text v-if="!nodetails">
              <vue-simple-markdown :source="item.details.substring(0,280) + '...'"></vue-simple-markdown>
            </v-card-text>
            <v-card-actions >
              <v-card-title class>From ${{item.cost}}</v-card-title>

              <router-link :to="'/offer/'+ featureKey+ '/' + item.id">
                <v-btn class="primary">More Info</v-btn>
              </router-link>
            </v-card-actions>
          </div>
        </div>
        <hr v-if="nodetails" />
      </v-card>
    </v-container>
  </div>
</template>
<script>
import _ from "lodash";
import Slider from "./Slider";
import Mainnav from "./Mainnav";

export default {
  components: { Slider, Mainnav },
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
  props: ["nodetails"]
};
</script>
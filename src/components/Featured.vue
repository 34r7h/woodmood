<template>
  <div>
    <div v-for="(feature, featureKey) in featuredObject" :key="featureKey">
      <h2>Featured {{featureKey}}</h2>
      <v-card :flat="Boolean(nodetails)" class="mb-3" v-for="(item, itemIndex) in feature" :key="itemIndex">
        <div class="d-flex flex-wrap" :class="itemIndex % 2 === 0 ? '' : 'flex-row-reverse'">
          <v-img
            class="flex-grow-1 flex-shrink-1"
            style="max-height: 320px; max-width: 100%; width: 40%; min-height: 180px; min-width: 240px;"
            :src="item.image"
          ></v-img>
          <div :class="nodetails ? 'align-center justify-center d-flex flex-column pa-0 mb-2' : 'flex-grow-1 flex-shrink-1'" style="min-width: 240px; max-width:100%; width: 60%">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle v-if="!nodetails" class="overline mb-4">
              <b>{{item.location}}</b> <span v-for="(season, seasonIndex) in item.season" :key="seasonIndex">{{season}} </span>
            </v-card-subtitle>
            <v-card-text v-if="!nodetails">{{item.details.substring(0,200)}}...</v-card-text>
            <v-card-actions class="d-flex justify-space-around" :class="nodetails ? 'mb-2 pa-0' : ''">
              <v-card-title>${{item.cost}}</v-card-title>
              <router-link :to="'/offer/'+ featureKey+ '/' + item.id">
                <v-btn>More Info</v-btn>
              </router-link>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  computed: {
    featuredObject() {
      return {
        tours:_.orderBy(Object.values(this.$store.state.tours).filter(x => x.featured), "id").reverse(),
        excursions:_.orderBy(Object.values(this.$store.state.excursions).filter(x => x.featured), "id").reverse()
      }
    }
  },
  props: ['nodetails']
};
</script>
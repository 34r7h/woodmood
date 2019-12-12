<template>
  <div>
    <v-card class="mb-3" v-for="(item, itemIndex) in featuredArray" :key="itemIndex">
      <div class="d-flex flex-wrap" :class="itemIndex % 2 === 0 ? '' : 'flex-row-reverse'">
        <v-img
          class="flex-grow-1 flex-shrink-1"
          style="max-height: 320px; max-width: 100%; width: 40%; min-height: 180px; min-width: 240px;"
          :src="item.image"
        ></v-img>
        <div class="flex-grow-1 flex-shrink-1" style="min-width: 240px; max-width:100%; width: 60%">
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle class="overline mb-4">
            <span v-for="(season, seasonIndex) in item.season" :key="seasonIndex">{{season}} </span>
          </v-card-subtitle>
          <v-card-text>{{item.details.substring(0,200)}}...</v-card-text>
          <v-card-actions class="d-flex justify-space-around">
            <v-card-title>${{item.cost}}</v-card-title>
            <router-link :to="'/offer/tour/' + item.id">
              <v-btn>More Info</v-btn>
            </router-link>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  computed: {
    featuredArray() {
      return _.orderBy(
        Object.values(this.$store.state.tours).filter(x => x.featured),
        "id", 
      ).reverse();
    }
  }
};
</script>
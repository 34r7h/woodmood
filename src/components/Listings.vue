<template>
  <v-container fluid class="grey lighten-5">
    <div class="d-flex justify-space-between align-center">
      <h1>{{type.toUpperCase()}}</h1>
      <v-btn class="d-flex d-sm-none">Filters</v-btn>
    </div>
    <v-row no-gutters>
      <v-col cols="12" sm="8">
        <div class outlined tile>
          <div class="d-flex flex-wrap">
            <v-card
              class="ma-1 flex-shrink-1"
              style="min-height: 240px; min-width: 240px; flex: 1"
              v-for="item in list"
              :key="item.id"
            >
              <v-img class="d-flex align-end" height="100%" :src="item.image">
                <v-card
                  flat
                  class="d-flex flex-wrap ma-2 px-2 flex-shrink-1 justify-space-between align-center"
                >
                  <h2>{{item.name}}</h2>
                  <b>from ${{item.cost}}</b>
                </v-card>
              </v-img>
            </v-card>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <v-banner style="width: 100%;" sticky class="pa-2" outlined tile>
          <filters style="width: 100%" :type="type" />
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import _ from "lodash";
import Filters from "./Filters";
export default {
  components: { Filters },
  computed: {
    list() {
      return _.orderBy(
        Object.values(this.$store.state[this.type]).filter((x, xKey) => {
            
            let toCheck = this.$store.state.filtered[this.type]            
            return (
                (JSON.stringify(x)).toLowerCase().indexOf(toCheck.search.toLowerCase()) > -1 
                && 
                (JSON.stringify(x.location)).toLowerCase().indexOf(toCheck.location.toLowerCase()) > -1
                &&
                (x.cost > toCheck.cost[0] && x.cost < toCheck.cost[1])
                &&
                (toCheck.seasons.length === 0 || toCheck.seasons.some(r => x.season.includes(r)))
            )
        }),
        this.sort
      ).reverse();
    }
  },
  data() {
    return {
      sort: "id"
    };
  },
  props: ["type"]
};
</script>

<style>
</style>
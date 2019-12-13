<template>
  <div v-if="$store.state[type][id]">
    <v-container fluid class="grey lighten-5">
      <v-card class="px-1 d-flex justify-space-between align-center flex-wrap">
        <div class="d-flex flex-column justify-center">
          <v-card-title>{{$store.state[type][id].name.toUpperCase()}}</v-card-title>
          <v-card-subtitle>{{$store.state[type][id].location}} from ${{$store.state[type][id].cost}}</v-card-subtitle>
        </div>
        <v-spacer />
        <v-card-actions class="d-flex flex-grow-1">
          <v-btn class="flex-grow-1 success" x-large>Book Now</v-btn>
        </v-card-actions>
      </v-card>
      <br />
      <v-row no-gutters>
        <v-col cols="12" sm="8">
          <v-card class="d-flex flex-column pa-2">
            <v-img :src="$store.state[type][id].image"></v-img>
            <v-card-subtitle class="d-flex justify-space-around">
              <v-chip class="label"
                v-for="(season, seasonIndex) in $store.state[type][id].season"
                :key="seasonIndex"
              >{{season}} </v-chip>
            </v-card-subtitle>
            <v-card-text>{{$store.state[type][id].details}}</v-card-text>
            <v-btn class="flex-grow-1 success" x-large>Book Now</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4" class="pa-1">
          <v-card flat class="pa-1">
            <featured nodetails="true" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Featured from "./Featured";
export default {
  components: { Featured },
  props: ["type", "id"]
};
</script>
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
          <v-btn @click="overlays()" class="flex-grow-1 success" x-large>Request Booking</v-btn>
        </v-card-actions>
      </v-card>
      <br />
      <v-row no-gutters>
        <v-col cols="12" sm="7">
          <v-card class="d-flex flex-column pa-2">
            <v-img :src="$store.state[type][id].image"></v-img>
            <v-card-subtitle class="d-flex justify-space-around">
              <v-chip
                small
                class="label"
                v-for="(season, seasonIndex) in $store.state[type][id].season"
                :key="seasonIndex"
              >
                <v-icon small>mdi-{{$store.state.icons[season]}}</v-icon>
                {{season}}
              </v-chip>
            </v-card-subtitle>
            <v-card-text>{{$store.state[type][id].details}}</v-card-text>
            <v-btn @click="overlays()" class="flex-grow-1 success" x-large>Request Booking</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5" class="pa-1">
          <v-card flat class="pa-1">
            <featured nodetails="true" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="$store.state.overlays[id]">
      <v-card light class="ma-2 pa-4">
        <v-btn text small @click="overlays()">
          <v-icon small>mdi-close</v-icon>Close
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
        type: "overlays",
        data: { [this.id]: !this.$store.state.overlays[this.id] }
      });
    }
  },
  mounted() {
    this.$store.commit("setState", {
      type: "overlays",
      data: { [this.id]: false }
    });
  },
  props: ["type", "id"]
};
</script>
<template>
  <div class="d-flex flex-column" style="width: 100%">
    <h2>Filters</h2>
    <br />
    <v-btn
      @click="updateFilters(); $store.commit('setState', {type: 'overlays', data: {listings: false}})"
    >Apply</v-btn>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="copy.search" label="Search text" single-line type="text"></v-text-field>

      <v-range-slider v-model="copy.cost" :max="500" :min="0" hide-details class="align-center">
        <template v-slot:prepend>
          <v-text-field
            v-model="copy.cost[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 40px"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            v-model="copy.cost[1]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 40px"
          ></v-text-field>
        </template>
      </v-range-slider>

      <v-text-field v-model="copy.location" label="Location" single-line type="text"></v-text-field>
      <v-text-field v-model="copy.type" label="Search type" single-line type="text"></v-text-field>
      <v-select
        v-model="copy.seasons"
        :items="['spring', 'summer', 'fall', 'winter' ]"
        label="Select Seasons"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip>
            <span>{{ item }}</span>
          </v-chip>
        </template>
      </v-select>
    </v-form>
  </div>
</template>
<style>
</style>
<script>
export default {
  computed: {
    copy() {
      return this.clone(this.$store.state.filtered[this.type]);
    }
  },
  props: ["type"],
  data() {
    return {
      filtered: {
        location: "",
        cost: [0, 500],
        search: "",
        seasons: [],
        type: ""
      },
      valid: true
    };
  },
  methods: {
    clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    updateFilters() {
      let filterObject = JSON.parse(JSON.stringify(this.$store.state.filtered));
      filterObject[this.type] = this.copy;
      this.$store.commit("setState", {
        type: "filtered",
        data: filterObject
      });
    }
  }
};
</script>
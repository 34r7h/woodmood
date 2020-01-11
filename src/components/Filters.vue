<template>
  <div class="d-flex flex-column" style="width: 100%">
    <h2>{{$t('filters')}}</h2>
    <br />
    <v-btn class="secondary"
      @click="updateFilters(); $store.commit('setState', {type: 'overlayFilter', data: false})"
    >{{$t('apply')}}</v-btn>
    <v-form ref="form" v-model="valid">
      <v-text-field v-model="copy.search" :label="$t('search text')" single-line type="text"></v-text-field>
      <label>{{$t("filter cost")}}</label>
      <v-range-slider v-model="copy.cost" :max="500" :min="0" hide-details class="align-center">
        <template v-slot:prepend>
          <v-text-field
            v-model="copy.cost[0]"
            class="mt-0 pt-0"
            hide-details
            single-line
            type="number"
            style="width: 40px"
            id="lowcost"
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
            id="highcost"
          ></v-text-field>
        </template>
      </v-range-slider>

      <v-text-field v-model="copy.location" :label="$t('location')" single-line type="text"></v-text-field>
      <v-text-field v-model="copy.type" :label="$t('search type')" single-line type="text"></v-text-field>
      <v-select
        v-model="copy.seasons"
        :items="[$t('spring'), $t('summer'), $t('fall'), $t('winter') ]"
        :label="$t('select seasons')"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip>
            <span>{{ $t(item) }}</span>
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
    "filters": "фильтры",
    "apply": "применять",
    "search text": "поиск текста",
    "filter cost": "стоимость фильтра",
    "location": "расположение",
    "search type": "тип поиска",
    "select seasons": "выберите сезоны"
  }
}
</i18n>
<template>
  <div>
    <v-card width="100%" class="ma-2">
      <v-flex>
        <v-data-table :search="search" :headers="headers" :items="items" :items-per-page="10">
          <template v-slot:top >
            <div class="d-flex justify-space-between align-center">
              <v-card-title>{{$t("transfers")}}</v-card-title>
              <v-text-field v-model="search" :label="$t('search transfers')" class="mx-4"></v-text-field>
            </div>
          </template>
          <template v-slot:item.image="{ item }">
            <div height="100px" width="162px">
              <v-img height="100px" width="162px" :src="item.image" :alt="item.name"></v-img>
            </div>
          </template>
          <template v-slot:item.name="{ item }">
            <div>
              <b>{{item.name}}</b>
            </div>
          </template>
          <template v-slot:item.cost="{ item }">
            <div>
              <div>${{item.cost}}</div>
            </div>
          </template>
        </v-data-table>
      </v-flex>
    </v-card>
  </div>
</template>
<script>
import Mainnav from "../components/Mainnav";

export default {
  components:{
    Mainnav
  },
  computed: {
    items() {
      return Object.values(this.$store.state.transfers);
    }
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "", value: "image", sortable: false, align: 'left' },
        { text: "", value: "name" },
        { text: this.$t("type"), value: "type" },
        { text: this.$t("from"), value: "from" },
        { text: this.$t("to"), value: "to" },
        { text: this.$t("cost"), value: "cost" }
      ]
    };
  },
  // nuxtI18n: {
  //   paths: {
  //     en: '/transfers',
  //     ru: '/трансфер'
  //   }
  // }
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
    "to": "в",
    "spring": "весна",
    "summer": "летом",
    "fall": "осень",
    "winter": "зима",
    "more info": "больше информации",
    "reserve": "zabronirovat'",
    "seasons": "сезоны",
    "filters": "фильтры",
    "search transfers": "поисковые переводы",
    "cost": "цена"
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
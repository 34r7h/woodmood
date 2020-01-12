<template>
  <div v-if="!requestSent">
    <v-card-title class="px-0">{{$t("request to book")}} {{item.name}}</v-card-title>
    <v-form ref="form">
      <v-date-picker
        v-if="chooseDate"
        v-model="bookingDetails.date"
        color="primary lighten-1"
        @input="chooseDate = false"
        width="100%"
      ></v-date-picker>
      <v-text-field
        v-if="!chooseDate"
        dense
        v-model="bookingDetails.name"
        :label="$t('name')"
        single-line
        type="text"
      ></v-text-field>
      <v-text-field
        v-if="!chooseDate"
        dense
        v-model="bookingDetails.email"
        :label="$t('email')"
        single-line
        type="email"
      ></v-text-field>
      <v-text-field
        v-if="!chooseDate"
        dense
        v-model="bookingDetails.phone"
        :label="$t('phone')"
        single-line
        type="text"
      ></v-text-field>
      <div class="d-flex justify-space-between">
        <v-text-field
          v-if="!chooseDate"
          dense
          v-model="bookingDetails.number"
          :label="$t('number of people')"
          single-line
          type="number"
        ></v-text-field>
        <v-spacer />
        <v-btn
          outlined
          v-if="!chooseDate"
          class
          @click="chooseDate = true"
        >{{bookingDetails.date || $t('date')}}</v-btn>
      </div>
      <v-btn :disabled="!bookingDetails.email || bookingDetails.email.indexOf('@') < 0 || bookingDetails.email.indexOf('.') < 0  " @click="sendRequest()" width="100%" x-large class="success">
        <b>{{$t("send request")}}</b>
      </v-btn>
    </v-form>
  </div>
  <div v-else>
    <div v-if="requestSent">
      <v-card-title>{{$t("Thank you")}}</v-card-title>
      <v-card-subtitle>{{$t("We will contact you")}}</v-card-subtitle>
      <v-card-text>
          <div>{{$t("name")}}: {{bookingDetails.name}}</div>
          <div>{{$t("email")}}: {{bookingDetails.email}}</div>
          <div>{{$t('phone')}}: {{bookingDetails.phone}}</div>
          <div>{{$t("people")}}: {{bookingDetails.number}}</div>
          <div>{{$t("date")}}: {{bookingDetails.date}}</div>
      </v-card-text>
      <v-btn width="100%" @click="close" class="secondary">{{$t("close")}}</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookingDetails: {
        name: "",
        email: "",
        phone: "",
        date: "",
        number: ""
      },
      chooseDate: false,
      requestSent: false
    };
  },
  methods: {
    close() {
      this.$store.commit("setState", {
        type: "overlayOffer",
        data: false
      });
      this.$store.commit("setState", {
        type: "overlayListings",
        data: false
      });
      this.$store.commit("setState", {
        type: "overlayFeatured",
        data: false
      });
    },
    sendRequest() {
      this.bookingDetails.timestamp = Date.now()
      this.bookingDetails.item = this.item
      this.$store.dispatch('sendBooking', this.bookingDetails)
      this.requestSent = true;
    }
  },
  props: ["item", 'id', 'type']
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
    "from": "от",
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
    "cost": "цена",
    "request to book": "запрос на книгу",
    "name": "имя",
    "email": "Эл. адрес",
    "phone": "Телефон",
    "number of people": "число людей",
    "date": "Дата",
    "send request": "послать запрос",
    "people": "люди",
    "close": "blizko",
    "Thank you": "Спасибо",
    "We will contact you": "мы свяжемся с вами"
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
<template>
  <div>
    <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides.tours"
      :key="i"
    >
      <v-img hero
      class="text-center"
      @click="$router.push('/offer/tours/'+slide.id)"
      :aspect-ratio="16/9"
      :src="slide.image"
      alt
    >

          <h1 class="mb-4">{{$store.state.lang === 'en' ? slide.name : slide.ru.name || slide.name}}</h1>
          <h4 class="subheading">{{$t('from')}} ${{slide.cost}}</h4>

    </v-img>
    </v-carousel-item>
  </v-carousel>
    <!-- <img hero src="https://www.thenaturaladventure.com/wp-content/uploads/2018/05/svaneti.jpg" alt=""> -->
  </div>
</template>
<script>
export default {
  name: 'slider',
  data(){
    return {
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ]
    }
  },
  props: ['slides']
}
</script>

<style scoped>
[hero] {
  color: rgba(255,255,255,.86);
  font-size: 200%;
  text-shadow: 0 0 6px rgba(255,255,255,.5), 0px -1px 1px rgba(255,255,255,.5), 0px 2px 2px rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-size: cover;
}
</style>
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
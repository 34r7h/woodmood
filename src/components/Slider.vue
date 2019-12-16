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

          <h1 class="mb-4">{{slide.name}}</h1>
          <h4 class="subheading">From ${{slide.cost}}</h4>

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
  text-shadow: 0 0 6px rgba(255,255,255,.9), 0px -1px 1px rgba(255,255,255,.9);
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-size: cover;
}
</style>
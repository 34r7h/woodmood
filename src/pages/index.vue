<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <featured/>
      <br>
      <about/>
    </v-flex>
  </v-layout>
</template>

<script>
import About from '../components/About'
import Featured from '../components/Featured'

export default {
  components: {About, Featured},
}
</script>
<style scoped>

</style>
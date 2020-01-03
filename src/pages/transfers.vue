<template>
  <div>
    <v-card width="100%">
      <v-flex>
        <v-data-table :search="search" :headers="headers" :items="items" :items-per-page="10" class>
          <template v-slot:top >
            <div class="d-flex justify-space-between align-center">
              <v-card-title>Transfers</v-card-title>
              <v-text-field v-model="search" label="Search Transfers" class="mx-4"></v-text-field>
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
        { text: "Type", value: "type" },
        { text: "From", value: "from" },
        { text: "To", value: "to" },
        { text: "Cost", value: "cost" }
      ]
    };
  }
};
</script>
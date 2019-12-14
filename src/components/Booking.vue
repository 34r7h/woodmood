<template>
  <div v-if="!requestSent">
    <v-card-title class="px-0">Request to book {{item.name}}</v-card-title>
    <v-card-subtitle class="px-0">We need a little information to make a quote</v-card-subtitle>
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
        label="Your Name"
        single-line
        type="text"
      ></v-text-field>
      <v-text-field
        v-if="!chooseDate"
        dense
        v-model="bookingDetails.email"
        label="Email Address"
        single-line
        type="text"
      ></v-text-field>
      <v-text-field
        v-if="!chooseDate"
        dense
        v-model="bookingDetails.phone"
        label="Phone Number"
        single-line
        type="text"
      ></v-text-field>
      <div class="d-flex justify-space-between">
        <v-text-field
          v-if="!chooseDate"
          dense
          v-model="bookingDetails.number"
          label="Number of People"
          single-line
          type="number"
        ></v-text-field>
        <v-spacer />
        <v-btn
          outlined
          v-if="!chooseDate"
          class
          @click="chooseDate = true"
        >{{bookingDetails.date || 'Choose Date'}}</v-btn>
      </div>
      <v-btn @click="sendRequest()" width="100%" x-large class="success">
        <b>Send Request</b>
      </v-btn>
    </v-form>
  </div>
  <div v-else>
    <v-card-title>Thank you, we'll be in touch.</v-card-title>
    <v-card-subtitle>Please check the submitted info. If there's a mistake, send the request again or contact us.</v-card-subtitle>
    <v-card-text>
        <div>Name: {{bookingDetails.name}}</div>
        <div>Email: {{bookingDetails.email}}</div>
        <div>Phone: {{bookingDetails.phone}}</div>
        <div>People: {{bookingDetails.number}}</div>
        <div>Date: {{bookingDetails.date}}</div>
    </v-card-text>
    <v-btn width="100%" @click="close" class="primary">Tap to close</v-btn>
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
        type: "overlays",
        data: { [this.item.id]: !this.$store.state.overlays[this.item.id] }
      });
    },
    sendRequest() {
      console.log(this.item, this.bookingDetails);
      this.bookingDetails.timestamp = Date.now()
      this.bookingDetails.item = this.item
      this.$store.dispatch('sendBooking', this.bookingDetails)
      this.requestSent = true;
    }
  },
  props: ["item"]
};
</script>
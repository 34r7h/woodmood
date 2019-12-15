<template>
  <div>
    <v-tabs>
      <v-tab
        @click="selected = section"
        v-for="(section, sectionKey) in types"
        :key="sectionKey"
      >{{section}}</v-tab>
      <v-spacer />
      <v-tab @click="selected = 'site';">site</v-tab>
      <v-tab @click="selected = 'bookings'; $store.dispatch('getBookings')">bookings</v-tab>
      <v-tab v-if="save">
        <v-btn
          @click="$store.dispatch(selected === 'site' ? 'updateSite' : 'update', {type: selected, data: copy[selected]}); save = false; saveConfirm()"
          outlined
          color="secondary"
          dark
          v-on="on"
        >
          <v-icon>mdi-check</v-icon>Save
        </v-btn>
      </v-tab>
      <v-tab v-if="saved">
        <v-icon>mdi-check</v-icon>Saved
      </v-tab>
      <v-tab>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">
              <v-icon>mdi-plus-box</v-icon>Add Items
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, itemKey) in types" :key="itemKey" @click="add(item)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-tab>
    </v-tabs>
    <v-card v-if="selected === 'site'">
      <v-card-title>Site Infomation</v-card-title>
      <v-form class="d-flex flex-wrap pa-2">
        <v-text-field @input="save=true" class="ma-1" v-model="copy.site.name" label="Site Name" single-line type="text"></v-text-field>
        <v-textarea @input="save=true" class="ma-1" label="About" auto-grow v-model="copy.site.about"></v-textarea>
        <v-textarea @input="save=true" class="ma-1" label="Partner Information" auto-grow v-model="copy.site.partners"></v-textarea>
        <v-text-field @input="save=true" class="ma-1" v-model="copy.site.fb" label="Facebook Page" single-line type="url"></v-text-field>
        <v-text-field @input="save=true" class="ma-1" v-model="copy.site.insta" label="Instagram Link" single-line type="url"></v-text-field>
        <v-text-field @input="save=true" class="ma-1" v-model="copy.site.contact" label="Contact Info" single-line type="url"></v-text-field>
        <v-text-field @input="save=true" class="ma-1" v-model="copy.site.phone" label="Phone Number" single-line type="text"></v-text-field>
        <v-text-field @input="save=true" class="ma-1" v-model="copy.site.email" label="Email Address" single-line type="email"></v-text-field>
      </v-form>
    </v-card>

    <v-card v-if="selected === 'bookings'">
      <v-card-title>Bookings</v-card-title>
      <v-card-text v-for="(booking, bookingKey) in $store.state.bookings" :key="bookingKey">
        <span>{{booking.date}}</span>
        <b>{{booking.item.name}}</b>
        <a class="px-2" :href="'mailto:' + booking.email">{{booking.email}}</a>
        <div class="d-flex flex-wrap">
          <div class="px-1">People: {{booking.number}}</div>
          <div class="px-1">Phone: {{booking.phone}}</div>
          <span>[ID: {{bookingKey}}]</span>
        </div>
      </v-card-text>
    </v-card>

    <v-simple-table fixed-header v-for="(section, sectionKey) in sections" :key="sectionKey">
      <template v-slot:default v-if="section.name === selected">
        <thead>
          <tr>
            <th
              v-for="(prop, propKey) in section.props"
              :key="propKey"
              class="text-left"
            >{{prop.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in copy[selected]" :key="item.id" v-if="item != null">
            <td
              :style="`width: ${100/section.props.length}vw;`"
              v-for="(prop, propKey) in section.props"
              :key="propKey"
            >
              <div v-if="prop.type === 'image-url'">
                <img :src="item[prop.name]" style="object-fit: cover; width:100%;" />
                <v-text-field
                  @input="save = true"
                  v-model="item[prop.name]"
                  type="url"
                  label="Image URL"
                ></v-text-field>
              </div>
              <v-text-field
                v-if="prop.type === 'text'"
                @input="save = true"
                v-model="item[prop.name]"
                type="text"
              ></v-text-field>
              <v-text-field
                v-if="prop.type === 'number'"
                @input="save = true"
                v-model="item[prop.name]"
                type="number"
              ></v-text-field>
              <v-textarea
                v-if="prop.type === 'textarea'"
                @input="save = true"
                v-model="item[prop.name]"
              ></v-textarea>
              <v-select
                label="select"
                v-if="prop.type === 'select'"
                @input="save = true"
                v-model="item[prop.name]"
                :items="prop.options"
                multiple
                chips
                persistent-hint
              ></v-select>
              <v-switch
                v-if="prop.type === 'switch'"
                @input="save = true"
                v-model="item[prop.name]"
              ></v-switch>
              <v-icon @click="remove(item.id, selected)" v-if="prop.type === 'delete'">mdi-delete</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
const findIndex = (values, expectedValue) => {
  let selectedIndex;
  const valuePresent = values.some((value, index) => {
    selectedIndex = index;
    return value === expectedValue;
  });
  return valuePresent ? selectedIndex : -1;
};
export default {
  computed: {
    copy() {
      return {
        tours: this.clone(this.$store.state.tours),
        excursions: this.clone(this.$store.state.excursions),
        transfers: this.clone(this.$store.state.transfers),
        site: this.clone(this.$store.state.site)
      };
    }
  },
  data() {
    return {
      on: false,
      save: false,
      saved: false,
      sections: [
        {
          name: "tours",
          props: [
            { name: "image", type: "image-url" },
            { name: "name", type: "text" },
            { name: "cost", type: "number" },
            { name: "details", type: "textarea" },
            { name: "location", type: "text" },
            {
              name: "season",
              type: "select",
              multiple: true,
              options: ["spring", "summer", "fall", "winter"]
            },
            { name: "featured", type: "switch" },
            { name: "remove", type: "delete" }
          ]
        },
        {
          name: "excursions",
          props: [
            { name: "image", type: "image-url" },
            { name: "name", type: "text" },
            { name: "cost", type: "number" },
            { name: "details", type: "textarea" },
            { name: "location", type: "text" },
            {
              name: "season",
              type: "select",
              multiple: true,
              options: ["spring", "summer", "fall", "winter"]
            },
            { name: "featured", type: "switch" },
            { name: "remove", type: "delete" }
          ]
        },
        {
          name: "transfers",
          props: [
            { name: "image", type: "image-url" },
            { name: "name", type: "text" },
            { name: "cost", type: "number" },
            { name: "details", type: "textarea" },
            {
              name: "season",
              type: "select",
              multiple: true,
              options: ["spring", "summer", "fall", "winter"]
            },
            { name: "featured", type: "switch" },
            { name: "remove", type: "delete" }
          ]
        }
      ],
      selected: "tours",
      types: ["tours", "excursions", "transfers"]
    };
  },
  methods: {
    add(item) {
      this.selected = item;
      let id = Date.now();
      this.copy[this.selected][id] = { id };
      this.selected = "";
      this.selected = item;
    },
    clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    remove(id, selected) {
      console.log("delete", id, selected);
      delete this.copy[this.selected][id];
      this.$store.commit("setState", {
        type: selected,
        data: this.copy[this.selected]
      });
      this.save = true;
      // return this.copy
    },
    saveConfirm() {
      this.saved = true;
      setTimeout(() => {
        this.saved = false;
      }, 2000);
    }
  }
};
</script>
<style scoped>
td {
  word-wrap: break-word;
}
</style>
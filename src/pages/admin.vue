<template>
  <div v-if="!$store.state.user">
    <v-form class="pa-4">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="user.email" type="text" label="email" />
        <v-text-field v-model="user.password" type="password" label="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$store.dispatch('login', user)" large class="secondary">Login</v-btn>
      </v-card-actions>
    </v-form>
  </div>
  <div v-else>
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
          @click="$store.dispatch(selected === 'site' || selected === 'bookings' ? 'updateSite' : 'update', {type: selected, data: copy[selected]}); save = false; saveConfirm()"
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
      <v-form :key="'site-' + lang" v-for="lang in ['en', 'ru']">
        <div class="d-flex flex-wrap pa-2" v-if="$store.state.lang === lang">
          <v-text-field
            @input="save=true"
            class="ma-1"
            v-model="copy.site[lang].name"
            label="Site Name"
            single-line
            type="text"
          ></v-text-field>
          <v-textarea
            @input="save=true"
            class="ma-1"
            label="About"
            auto-grow
            style="min-width:220px;"
            v-model="copy.site[lang].about"
          ></v-textarea>
          <v-textarea
            @input="save=true"
            class="ma-1"
            label="Partner Information"
            auto-grow
            style="min-width:220px;"
            v-model="copy.site[lang].partners"
          ></v-textarea>
          <v-text-field
            @input="save=true"
            class="ma-1"
            v-model="copy.site[lang].fb"
            label="Facebook Page"
            single-line
            type="url"
          ></v-text-field>
          <v-text-field
            @input="save=true"
            class="ma-1"
            v-model="copy.site[lang].insta"
            label="Instagram Link"
            single-line
            type="url"
          ></v-text-field>
          <v-textarea
            @input="save=true"
            class="ma-1"
            style="min-width:220px;"
            v-model="copy.site[lang].contact"
            label="Contact Info"
          ></v-textarea>
          <v-text-field
            @input="save=true"
            class="ma-1"
            v-model="copy.site[lang].phone"
            label="Phone Number"
            single-line
            type="text"
          ></v-text-field>
          <v-text-field
            @input="save=true"
            class="ma-1"
            v-model="copy.site[lang].email"
            label="Email Address"
            single-line
            type="email"
          ></v-text-field>
        </div>
      </v-form>
    </v-card>

    <div v-if="selected === 'bookings'">
      <v-card-title>Bookings</v-card-title>
      <div class="flex-column-reverse d-flex">
        <v-card
          :class="booking.status === 'complete' ? 'dark accent' : booking.status === 'booked' ? 'dark info' : null"
          :style="booking.status === 'complete' ? 'order: 0' : booking.status === 'booked' ? 'order:1' : 'order: 2' "
          class="ma-1 pa-2"
          v-for="(booking, bookingKey) in copy.bookings"
          :key="bookingKey"
        >
          <div class="d-flex flex-wrap justify-space-between">
            <b>{{booking.item.name}}</b>
            <div class="mx-2">{{booking.name}}</div>
            <v-spacer></v-spacer>
            <a class :href="'mailto:' + booking.email">{{booking.email}}</a>
          </div>
          <v-card-subtitle class="mb-2 px-0 d-flex flex-wrap justify-space-between align-center">
            <span>{{booking.date}}</span>
            <span class="mx-2 d-flex align-center">
              Status:
              <v-select
                @input="save=true"
                :items="['new', 'emailed', 'booked', 'complete']"
                class="mx-2"
                v-model="booking.status"
              ></v-select>
            </span>
          </v-card-subtitle>
          <div class="d-flex flex-wrap justify-space-between">
            <div class>People: {{booking.number}}</div>
            <div class>Phone: {{booking.phone}}</div>
            <span>[ID: {{bookingKey}}]</span>
          </div>
        </v-card>
      </div>
    </div>

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
          <tr v-for="item in (copy[selected])" :key="item.id" v-if="item != null">
            <td
              :style="`width: ${100/section.props.length}vw;`"
              v-for="(prop, propKey) in section.props"
              :key="propKey"
              v-if="propKey !== 'ru'"
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
                v-if="prop.type === 'text' && $store.state.lang === 'en'"
                @input="save = true"
                style="min-width:110px;"
                v-model="item[prop.name]"
                type="text"
              ></v-text-field>
              <v-text-field
                v-if="prop.type === 'text' && $store.state.lang === 'ru'"
                @input="save = true"
                style="min-width:110px;"
                v-model="item.ru[prop.name]"
                type="text"
              ></v-text-field>
              <v-text-field
                v-if="prop.type === 'number'"
                @input="save = true"
                v-model="item[prop.name]"
                type="number"
                style="min-width:55px;"
              ></v-text-field>
              <v-textarea
                style="min-width:220px;"
                v-if="prop.type === 'textarea' && $store.state.lang === 'en'"
                @input="save = true"
                v-model="item[prop.name]"
              ></v-textarea>
              <v-textarea
                style="min-width:220px;"
                v-if="prop.type === 'textarea' && $store.state.lang === 'ru'"
                @input="save = true"
                v-model="item.ru[prop.name]"
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
        site: this.clone(this.$store.state.site),
        bookings: this.clone(this.$store.state.bookings)
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
            { name: "type", type: "text" },
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
            { name: "type", type: "text" },
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
            { name: "to", type: "text" },
            { name: "from", type: "text" },
            { name: "type", type: "text" },
            { name: "details", type: "textarea" },
            { name: "remove", type: "delete" }
          ]
        }
      ],
      selected: "tours",
      types: ["tours", "excursions", "transfers"],
      user: { email: "", password: "" }
    };
  },
  methods: {
    add(item) {
      // item === 'tours'
      this.selected = item;
      let id = Date.now();
      this.copy[this.selected][id] = { id, ru: {} };
      this.selected = "";
      this.selected = item;
    },
    clone(obj, name) {
      let retObj = JSON.parse(JSON.stringify(obj));
      // if (Object.keys(retObj).length > 0 && !name) {
      //   Object.keys(retObj).forEach(key => {
      //     console.log(key, retObj[key], retObj[key]['ru'])
      //     retObj[key]['ru'] = retObj[key]['ru'] || retObj[key]
      //     console.log(retObj[key]['ru'])
      //   });
      // }
      return retObj;
    },
    remove(id, selected) {
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
      }, 3000);
    }
  },
  mounted() {
    window &&
      window.localStorage.getItem("user") &&
      this.$store.commit("setState", {
        type: "user",
        data: JSON.parse(window.localStorage.getItem("user"))
      });
  }
};
</script>
<style scoped>
td {
  word-wrap: break-word;
}
.v-textarea textarea {
  min-width: 220px !important;
}
</style>
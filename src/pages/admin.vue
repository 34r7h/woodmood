<template>
  <div>
    <v-tabs>
      <v-tab
        @click="selected = section"
        v-for="(section, sectionKey) in types"
        :key="sectionKey"
      >{{section}}</v-tab>
      <v-spacer />
      <v-tab @click="selected = 'site'">site</v-tab>
      <v-tab v-if="save">
        <v-btn
          @click="$store.dispatch('update', {type: selected, data: copy[selected]}); save = false; saveConfirm()"
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
      <v-card-title class>Featured Tours</v-card-title>
      <v-card-text>
        <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
        <p>
          For more information on Vuetify, check out the
          <a
            href="https://vuetifyjs.com"
            target="_blank"
          >documentation</a>.
        </p>
        <p>
          If you have questions, please join the official
          <a
            href="https://chat.vuetifyjs.com/"
            target="_blank"
            title="chat"
          >discord</a>.
        </p>
        <p>
          Find a bug? Report it on the github
          <a
            href="https://github.com/vuetifyjs/vuetify/issues"
            target="_blank"
            title="contribute"
          >issue board</a>.
        </p>
        <p>Thank you for developing with Vuetify and I look forward to bringing more exciting features in the future.</p>
        <div class="text-xs-right">
          <em>
            <small>&mdash; John Leider</small>
          </em>
        </div>
        <hr class="my-3" />
        <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
        <br />
        <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" nuxt to="/inspire">Continue</v-btn>
      </v-card-actions>
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
          <tr v-for="item in copy[selected]" :key="item.id">
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
        transfers: this.clone(this.$store.state.transfers)
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
            {
              name: "season",
              type: "select",
              multiple: true,
              options: ["spring", "summer", "fall", "winter"]
            },
            { name: "featured", type: "switch" }
          ]
        },
        {
          name: "excursions",
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
            { name: "featured", type: "switch" }
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
            { name: "featured", type: "switch" }
          ]
        }
      ],
      selected: "tours",
      types: ["tours", "excursions", "transfers"]
    };
  },
  methods: {
    add() {
      console.log(this.$fireAuth, this.$fireStore);
    },
    clone(obj) {
      return JSON.parse(JSON.stringify(obj));
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
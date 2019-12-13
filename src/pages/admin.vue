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
      <h5>Site stuff</h5>
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
            {name: 'location', type: 'text'},
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
            {name: 'location', type: 'text'},
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
      this.selected = item
      let id = Date.now()
      this.copy[this.selected][id] = {id}
      this.selected = ''
      this.selected = item
    },
    clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    },
    remove(id, selected) {
      console.log('delete', id, selected)
      delete this.copy[this.selected][id]
      this.$store.commit('setState', {type: selected, data: this.copy[this.selected]})
      this.save = true
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
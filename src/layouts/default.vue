<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>
        <router-link to="/">{{title}}</router-link>
      </v-toolbar-title>
      <v-spacer />
      <div class="d-none d-sm-flex">
        <contact />
      </div>
      <v-btn text>🇷🇺 / 🇬🇧</v-btn>
      <v-btn class="d-flex d-sm-none" icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <mainnav  style="width:100%;" class="d-none d-sm-flex" />
      <nuxt />
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item>
          <contact />
        </v-list-item>
      </v-list>
      <mainnav style="width:100%;" sidebar="true" />
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{(new Date()).getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import VueSimpleMarkdown from "vue-simple-markdown";
import "vue-simple-markdown/dist/vue-simple-markdown.css";

Vue.use(VueSimpleMarkdown);
import Contact from "../components/Contact";
import Mainnav from "../components/Mainnav";

export default {
  components: { Contact, Mainnav },
  created() {
    this.$vuetify.theme.dark = false;
    // this.$vuetify.theme.dark = new Date().getHours() < 9 || new Date().getHours() > 21 ? true : false;
    this.$store.dispatch("get", this.$store.state);
    this.$store.dispatch("getSite", this.$store.state);
  },
  data() {
    return {
      clipped: false,
      dark: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "🇬🇪 Tours 🇬🇪"
    };
  }
};
</script>
<style>
.v-toolbar__content {
  width: 100%;
}
.v-banner__text {
  width: 100% !important;
}
.v-banner__wrapper {
  padding: 8px !important;
}
a,
router-link {
  text-decoration: none;
}
</style>
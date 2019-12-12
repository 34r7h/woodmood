<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      
      
      <v-toolbar-title><router-link to="/">{{title}}</router-link></v-toolbar-title>
      <v-spacer />
      <v-btn class="me-2"
        icon
      >
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn class="me-2"
        icon
      >
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-item-group>
        <v-item class="me-2">
          <v-btn outlined>Contact</v-btn>
        </v-item>
        <v-item class="me-2">
          <v-btn text>🇷🇺 / 🇬🇧</v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <slider v-if="$route.name === 'index'"/>
        <mainnav v-if="$route.name !== 'admin'" />
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{(new Date()).getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Mainnav from '../components/Mainnav'
import Slider from '../components/Slider'

export default {
  components: {Mainnav, Slider},
  created () {
    this.$vuetify.theme.dark = (new Date()).getHours() < 9 || (new Date()).getHours() > 21 ? true : false
    this.$store.dispatch('get', this.$store.state)
  },
  data () {
    return {
      clipped: false,
      dark: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: '🇬🇪 Tours 🇬🇪'
    }
  }
}
</script>
<style>
a, router-link {
  text-decoration: none;
}
</style>
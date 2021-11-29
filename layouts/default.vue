<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list class="d-flex flex-column" height="100%">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          active-class="primary--text border-color rounded-xl"
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
        <v-list-item
          class="mt-auto"
          @click="() => ($vuetify.theme.dark = !$vuetify.theme.dark)"
        >
          <v-list-item-action>
            <v-icon v-if="$vuetify.theme.dark">mdi-brightness-7</v-icon>
            <v-icon v-if="!$vuetify.theme.dark">mdi-brightness-2</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            {{ `Tema ${!$vuetify.theme.dark ? 'oscuro' : 'claro'}` }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Main',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Pacientes',
          to: '/patients',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
}
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 0.4rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #043353;
  border-radius: 0.2rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #292939;
}
.v-list-item {
  flex: 0;
}
</style>

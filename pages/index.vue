<template>
  <div id="bgDental" class="d-flex align-center justify-center dentalImg">
    <div class="d-flex justify-center align-center flex-column">
      <div class="py-16 blured d-inline-flex align-center justify-center">
        <h1 class="primary--text display-1 text-h1 text-center">
          Administrador de Prácticas Odontológicas
        </h1>
      </div>
      <div class="mt-6 pa-8 bluredShort flex-column rounded-xl">
        <v-layout>
          <v-flex>
            <v-card class="elevation-12">
              <v-toolbar
                class="d-flex justify-center align-center"
                dark
                :color="$vuetify.theme.dark ? '#043353' : 'primary'"
              >
                <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login.identifier"
                    prepend-icon="mdi-account"
                    name="login"
                    label="Usuario"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    v-model="login.password"
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Contraseña"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="flex-column">
                <v-spacer></v-spacer>
                <v-btn
                  class="px-10"
                  :color="$vuetify.theme.dark ? '#043353' : 'primary'"
                  @click="userLogin"
                  >Iniciar Sesión</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <h3 class="d-flex justify-center align-center pt-6">
          <v-divider class="mx-2" color="black"></v-divider> O
          <v-divider class="mx-2" color="black"></v-divider>
        </h3>
        <v-btn
          x-large
          :color="$vuetify.theme.dark ? '#043353' : 'primary'"
          class="mt-6"
        >
          <div class="d-flex justify-center mr-4 microsoft"></div>
          Iniciar sesión con Microsoft
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'unauthenticated',
  data() {
    return {
      login: {
        identifier: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.login,
        })
        this.$auth.strategy.token.set(response.data.jwt)
        this.$auth.setUser(response.data.user)
      } catch (err) {}
    },
  },
}
</script>

<style scoped>
span {
  white-space: nowrap;
}
.blured {
  width: 120%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px) saturate(70%) contrast(45%) brightness(110%);
}

.bluredShort {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px) saturate(70%) contrast(45%) brightness(110%);
}
.dentalImg {
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(static\dentalImg.jpg);
}

.microsoft {
  height: 2.5vh;
  width: 2.5vh;
  background-size: cover;
  background-image: url(static\microsoftLogo.svg);
}
</style>

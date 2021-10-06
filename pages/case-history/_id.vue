<template>
  <div>
    <template v-if="caseHistory.patient">
      Historia clinica de :
      {{ caseHistory.patient.first_name + ' ' + caseHistory.patient.last_name }}
    </template>

    <v-item-group v-model="window" class="shrink mr-6 d-flex justify-center">
      <v-item v-for="w in windows" :key="w.n" v-slot="{ active, toggle }">
        <div>
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>
    <v-col>
      <v-window v-model="window" horizontal>
        <v-window-item v-for="w in windows" :key="w.n" class="evolution">
          <p class="text-center font-weight-bold text-xl">{{ w.name }}</p>
          <!-- Ventana de historial clinico -->
          <v-card v-if="w.n === 0" flat>
            <template v-if="caseHistory.evolutions">
              <!-- Evolutions -->
              <v-expansion-panels focusable>
                <v-expansion-panel
                  v-for="evolution in caseHistory.evolutions"
                  :key="evolution.id"
                >
                  <v-expansion-panel-header
                    class="d-flex justify-space-between"
                  >
                    <div>
                      {{ new Date(evolution.date).toLocaleString('es-AR') }}
                    </div>
                    <div class="font-weight-black">
                      {{ evolution.motive }}
                    </div>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-textarea :value="evolution.evolution" readonly />
                    <odontogram :odontogram="evolution.odontogram" readonly />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
            <template v-else
              >Este paciente no tiene evoluciones creadas.</template
            >
          </v-card>

          <!-- ventana de nueva evolucion -->
          <v-card v-if="w.n === 1" flat>
            <form>
              <v-text-field v-model="newEvolution.date" required></v-text-field>
              <v-text-field
                v-model="newEvolution.motive"
                required
              ></v-text-field>
              <v-textarea v-model="newEvolution.evolution"></v-textarea>
              <odontogram :odontogram="newEvolution.odontogram" />
              <pre>{{ newEvolution }}</pre>

              <v-btn type="submit"> Guardar </v-btn>
            </form>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
  </div>
</template>

<script>
import Odontogram from '../../components/Odontogram.vue'
export default {
  components: { Odontogram },
  data() {
    return {
      caseHistory: {},
      window: 0,
      windows: [
        { n: 0, name: 'Evoluciones' },
        { n: 1, name: 'Nueva evolucion' },
      ],
      newEvolution: {},
    }
  },
  mounted() {
    this.fetchCaseHistory()
    console.log(this.caseHistory)
  },
  methods: {
    async fetchCaseHistory() {
      const { data } = await this.$axios.get(
        `case-histories/${this.$route.params.id}`
      )
      this.caseHistory = data
    },
  },
}
</script>

<style scoped></style>

<template>
  <div>
    <patient-card
      v-if="caseHistory.patient"
      :patient="caseHistory.patient"
      @onChange="editPatientData"
      @onSubmit="updatePatientData"
    />

    <v-item-group
      v-model="window"
      class="shrink mr-6 d-flex justify-center pt-5"
    >
      <v-item v-for="w in windows" :key="w.n" v-slot="{ active, toggle }">
        <div>
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon v-if="w.n === 0" dark> mdi-book-outline </v-icon>
            <v-icon v-if="w.n === 1" dark> mdi-plus </v-icon>
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
              <odontogram
                :odontogram="newEvolution.odontogram"
                @toothClicked="AppendProcedure"
              />
              <pre>{{ newEvolution }}</pre>

              <v-btn type="submit"> Guardar </v-btn>
            </form>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>

    <!-- // Modal cuando diente o cara es clickeado -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{
            `${selectedTooth.tooth} - ${selectedTooth.face}`
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump',
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Odontogram from '../../components/Odontogram.vue'
import PatientCard from '../../components/PatientCard.vue'
export default {
  components: { Odontogram, PatientCard },
  data() {
    return {
      caseHistory: {},
      window: 0,
      windows: [
        { n: 0, name: 'Evoluciones' },
        { n: 1, name: 'Nueva evolucion' },
      ],
      newEvolution: {},
      dialog: false,
      selectedTooth: {},
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
    AppendProcedure(tooth) {
      this.selectedTooth = tooth
      this.dialog = true
    },
    editPatientData(patient) {
      this.patient = patient
      console.log(patient)
    },
    async updatePatientData() {
      console.log(this.patient)
      const { data } = await this.$axios.put(
        `patients/${this.patient.id}`,
        this.patient
      )
      console.log(data)
    },
  },
}
</script>

<style scoped></style>

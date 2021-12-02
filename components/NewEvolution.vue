<template>
  <v-container>
    <form @submit.prevent="saveEvolution">
      <v-row>
        <v-text-field
          v-model="newEvolution.motive"
          label="Motivo"
          required
          class="px-4"
        ></v-text-field>
        <v-text-field
          :value="formattedDate"
          label="Fecha"
          readonly
          required
          class="px-4"
        ></v-text-field>
      </v-row>

      <v-textarea
        v-model="newEvolution.observation"
        label="Observación"
        rows="2"
      ></v-textarea>
      <v-textarea
        v-model="newEvolution.treatment_plan"
        label="Plan de tratamiento"
        rows="2"
      ></v-textarea>
      <v-textarea
        v-model="newEvolution.diagnosis"
        label="Diagnóstico"
        rows="2"
      ></v-textarea>
      <div class="d-flex justify-space-around">
        <v-switch
          v-model="newEvolution.tartar"
          :label="`Presencia de sarro`"
        ></v-switch>
        <v-switch
          v-model="newEvolution.periodontal_disease"
          :label="`Enfermedad Periodontal`"
        ></v-switch>
      </div>
      <odontogram
        ref="odontogram"
        :odontogram="newEvolution.odontogram"
        @toothClicked="openDialog"
      />
      <div class="d-flex justify-center">
        <v-btn type="submit"> Guardar </v-btn>
      </div>
    </form>
    <hr class="my-6" />
    <v-snackbar v-model="snackbar" vertical>
      {{ text }}

      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <form @submit.prevent="appendProcedure">
          <v-card-title>
            <span class="text-h5">{{
              `Diente: ${selectedTooth.tooth} ; Cara: ${selectedTooth.face}`
            }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :value="selectedProcedure"
                    :items="procedureSelector"
                    label="Procedimiento"
                    @change="(value) => (selectedProcedure = value)"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    :value="selectedProcedure"
                    :items="colorSelector"
                    label="Estado"
                    @change="(value) => (selectedState = value)"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" type="submit" text> Guardar </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { stateColor, procedureSelector, colorSelector } from 'static/helpers.js'
export default {
  emits: ['created'],
  data() {
    return {
      newEvolution: {
        case_history: this.$route.params,
        date: new Date().toISOString(),
        odontogram: [],
      },
      selectedTooth: {},
      selectedProcedure: null,
      selectedState: null,
      dialog: false,
      stateColor,
      procedureSelector,
      colorSelector,
      snackbar: false,
      text: null,
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.newEvolution.date).toLocaleDateString('es-AR')
    },
  },
  methods: {
    openDialog(tooth) {
      this.selectedTooth = tooth
      this.dialog = true
    },
    appendProcedure() {
      if (!this.selectedProcedure) return
      if (this.selectedState === null) return

      const exTooth = this.newEvolution.odontogram.find(
        (e) => e.id === this.selectedTooth.tooth
      )
      if (exTooth) {
        if (exTooth.faces.find((f) => f.id === this.selectedTooth.face))
          exTooth.faces.find(
            (f) => f.id === this.selectedTooth.face
          ).procedures = [
            ...exTooth.faces.find((f) => f.id === this.selectedTooth.face)
              .procedures,
            {
              procedureSelector: this.selectedProcedure,
              state: this.selectedState,
            },
          ]
        else {
          exTooth.faces = [
            ...exTooth.faces,
            {
              id: this.selectedTooth.face,
              procedures: [
                {
                  procedureSelector: this.selectedProcedure,
                  state: this.selectedState,
                },
              ],
            },
          ]
        }
      } else {
        this.newEvolution.odontogram = [
          ...this.newEvolution.odontogram,
          {
            id: this.selectedTooth.tooth,
            faces: [
              {
                id: this.selectedTooth.face,
                procedures: [
                  {
                    procedureSelector: this.selectedProcedure,
                    state: this.selectedState,
                  },
                ],
              },
            ],
          },
        ]
      }
      setTimeout(() => {
        this.$refs.odontogram.populateOdontogram()
        this.selectedProcedure = null
        this.selectedState = null
        this.dialog = false
      }, 500)
    },
    async saveEvolution() {
      const res = await this.$axios.post(`evolutions`, this.newEvolution)
      if (res.status === 200) {
        this.text = 'Evolución guardada con exito!'
        this.snackbar = true
        setTimeout(() => {
          this.snackbar = false
          this.$emit('created')
        }, 2000)
      } else {
        this.text = 'Ocurrio un problema al guardar la evolución'
        this.snackbar = true
        setTimeout(() => {
          this.snackbar = false
        }, 2000)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>

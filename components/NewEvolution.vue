<template>
  <div>
    <form @submit.prevent="saveEvolution">
      <v-text-field
        :value="formattedDate"
        label="Fecha"
        readonly
        required
      ></v-text-field>
      <v-text-field
        v-model="newEvolution.motive"
        label="Motivo"
        required
      ></v-text-field>
      <v-textarea
        v-model="newEvolution.evolution"
        label="Desarrollo"
      ></v-textarea>
      <odontogram
        ref="odontogram"
        :odontogram="newEvolution.odontogram"
        @toothClicked="openDialog"
      />

      <v-btn type="submit"> Guardar </v-btn>
    </form>
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
                    :items="procedureSelector"
                    label="Procedimiento"
                    @change="(value) => (selectedProcedure = value)"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
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
  </div>
</template>

<script>
import { stateColor, procedureSelector, colorSelector } from 'static/helpers.js'
export default {
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
      this.selectedProcedure = null
      this.selectedState = null
      this.dialog = true
    },
    appendProcedure() {
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
        this.dialog = false
      }, 500)
    },
    async saveEvolution() {
      console.log(this.newEvolution)
      const res = await this.$axios.post(`evolutions`, this.newEvolution)
      console.log(res)
    },
  },
}
</script>

<style lang="scss" scoped></style>

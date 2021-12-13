<template>
  <!-- eslint-disable vue/no-unused-vars -->
  <v-container>
    <template v-if="caseHistory">
      <PatientCard
        :patient="caseHistory.patient"
        :is-minimal="true"
        @onChange="editPatientData"
        @onSubmit="updatePatientData"
      />
      <v-card flat class="pa-3">
        <div class="text-center">
          <v-btn
            class="my-6"
            color="primary"
            outlined
            @click="() => (creatingNewEvolution = !creatingNewEvolution)"
          >
            <div v-if="!creatingNewEvolution">
              <v-icon dark> mdi-plus </v-icon>
              Nueva Evolución
            </div>
            <div v-else>
              <v-icon dark> mdi-book-outline </v-icon>
              Historial
            </div>
          </v-btn>
        </div>
        <NewEvolution
          v-if="creatingNewEvolution"
          :case-history="caseHistory.id"
          @created="
            () => {
              creatingNewEvolution = false
              fetchCaseHistory()
            }
          "
        />

        <!-- Aca visualizar las evoluciones minimalistas -->
        <v-data-table
          v-if="caseHistory.evolutions"
          class="cursor-pointer"
          :loading="loadingData"
          :headers="headers"
          :items="caseHistory.evolutions"
          :search="search"
          flat
        >
          <template #item.date="{ item }">
            {{ formattedDate(item.date) }}
          </template>
          <template #item.action="{ item }">
            <v-btn
              outlined
              color="primary"
              @click="
                () => {
                  $router.push(`/evolution/${item.id}`)
                }
              "
            >
              Ver Evolución
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </template>
    <v-snackbar v-model="snackbar" :vertical="vertical">
      {{ text }}

      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false"> Cerrar </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      caseHistory: null,
      creatingNewEvolution: false,
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Fecha', value: 'date' },
        { text: 'Motivo', value: 'motive' },
        { text: 'Action', value: 'action', width: '200' },
      ],
      snackbar: false,
    }
  },

  mounted() {
    this.fetchCaseHistory()
  },
  methods: {
    formattedDate(date) {
      return new Date(date).toLocaleDateString('es-AR')
    },
    async fetchCaseHistory() {
      const { data: history } = await this.$axios.get(
        `case-histories?patient.id=${this.$route.params.id}`
      )
      this.caseHistory = history[0]
      if (!history[0]) {
        this.createCaseHistory()
      }
    },
    async createCaseHistory() {
      const res = await this.$axios.post(`case-histories`, {
        patient: this.$route.params.id,
      })
      if (res.status === 200) this.caseHistory = res.data
    },
    editPatientData(patient) {
      this.caseHistory.patient = patient
    },
    async updatePatientData() {
      const res = await this.$axios.put(
        `patients/${this.caseHistory.patient.id}`,
        this.caseHistory.patient
      )
      if (res.status === 200) {
        this.text = 'Se actualizaron los datos del paciente.'
        this.snackbar = true
        this.disabled = true
        setTimeout(() => {
          this.snackbar = false
        }, 3000)
      } else {
        this.text = 'Ocurrió un error al actualizar el paciente.'
        this.snackbar = true
        setTimeout(() => {
          this.snackbar = false
        }, 3000)
      }
    },
  },
}
</script>

<style scoped></style>

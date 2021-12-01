<template>
  <!-- eslint-disable vue/no-unused-vars -->
  <div>
    <v-container>
      <PatientCard
        v-if="caseHistory.patient"
        :patient="caseHistory.patient"
        :is-minimal="true"
        @onChange="editPatientData"
        @onSubmit="updatePatientData"
      />
      <v-card>
        <div class="text-center">
          <v-btn
            class="my-6"
            color="primary"
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
        <NewEvolution v-if="creatingNewEvolution" />

        <!-- Aca visualizar las evoluciones minimalistas -->
        <v-data-table
          class="cursor-pointer"
          :loading="loadingData"
          :headers="headers"
          :items="caseHistory.evolutions"
          :search="search"
          flat
        >
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
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caseHistory: {},
      creatingNewEvolution: false,
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Fecha', value: 'date' },
        { text: 'Motivo', value: 'motive' },
        { text: 'Action', value: 'action', width: '200' },
      ],
    }
  },
  mounted() {
    this.fetchCaseHistory()
  },
  methods: {
    async fetchCaseHistory() {
      const { data } = await this.$axios.get(
        `case-histories/${this.$route.params.id}`
      )
      this.caseHistory = data
    },
    editPatientData(patient) {
      this.caseHistory.patient = patient
    },
    async updatePatientData() {
      await this.$axios.put(
        `patients/${this.caseHistory.patient.id}`,
        this.caseHistory.patient
      )
    },
  },
}
</script>

<style scoped></style>

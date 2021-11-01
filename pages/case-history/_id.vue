<template>
  <!-- eslint-disable vue/no-unused-vars -->
  <div>
    <PatientCard
      v-if="caseHistory.patient"
      :patient="caseHistory.patient"
      @onChange="editPatientData"
      @onSubmit="updatePatientData"
    />

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
    <EvolutionView
      v-if="caseHistory.evolutions && !creatingNewEvolution"
      :evolutions="caseHistory.evolutions"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      caseHistory: {},
      creatingNewEvolution: false,
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
      this.patient = patient
    },
    async updatePatientData() {
      await this.$axios.put(`patients/${this.patient.id}`, this.patient)
    },
  },
}
</script>

<style scoped></style>

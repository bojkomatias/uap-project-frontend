<template>
  <div>
    <PatientCard
      v-if="caseHistory.patient"
      :patient="caseHistory.patient"
      @onChange="editPatientData"
      @onSubmit="updatePatientData"
    />

    <v-item-group class="shrink mr-6 d-flex justify-center">
      <v-item>
        <v-btn @click="() => (creatingNewEvolution = !creatingNewEvolution)">
          <v-icon v-if="!creatingNewEvolution" dark> mdi-plus </v-icon>
          <v-icon v-else dark> mdi-book-outline </v-icon>
        </v-btn>
      </v-item>
    </v-item-group>

    <v-col>
      <NewEvolution v-if="creatingNewEvolution" />
      <EvolutionView
        v-if="caseHistory.evolutions && !creatingNewEvolution"
        :evolutions="caseHistory.evolutions"
      />
    </v-col>
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
    console.log(this.caseHistory)
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

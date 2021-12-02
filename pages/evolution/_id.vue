<template>
  <div>
    <v-container>
      <!-- <v-textarea :value="evolution" readonly />
      <odontogram :odontogram="odontogram" readonly /> -->
      <v-text-field :value="formattedDate" readonly></v-text-field>
      <v-textarea :value="motive" readonly />
      <odontogram :odontogram="odontogram" readonly />
      <div class="d-flex justify-space-around">
        <v-switch
          v-model="tartar"
          :label="`Presencia de sarro`"
          readonly
        ></v-switch>
        <v-switch
          v-model="periodontal_disease"
          :label="`Enfermedad Periodontal`"
          readonly
        ></v-switch>
      </div>
      <v-textarea :value="observation" readonly></v-textarea>
      <v-textarea :value="treatment_plan" readonly></v-textarea>
      <v-textarea :value="diagnosis" readonly></v-textarea>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evolution: {},
    }
  },
  mounted() {
    this.fetchEvolution()
  },

  methods: {
    async fetchEvolution() {
      const { data } = await this.$axios.get(
        `evolutions/${this.$route.params.id}`
      )
      this.evolution = data
    },
  },
}
</script>

<template>
  <div>
    <v-container>
      <v-breadcrumbs
        class="mt-10 px-0"
        divider=">"
        :items="getItems()"
      ></v-breadcrumbs>
      <v-text-field
        :value="formattedDate"
        label="Fecha"
        readonly
      ></v-text-field>
      <v-text-field :value="evolution.motive" label="Motivo" readonly />
      <v-textarea
        :value="evolution.observation"
        label="Observación"
        rows="2"
        readonly
      ></v-textarea>
      <v-textarea
        :value="evolution.treatment_plan"
        label="Plan de tratamiento"
        rows="2"
        readonly
      ></v-textarea>
      <v-textarea
        :value="evolution.diagnosis"
        label="Diagnóstico"
        rows="2"
        readonly
      ></v-textarea>
      <div class="d-flex justify-space-around">
        <v-switch
          v-model="evolution.tartar"
          :label="`Presencia de sarro`"
          readonly
        ></v-switch>
        <v-switch
          v-model="evolution.periodontal_disease"
          :label="`Enfermedad Periodontal`"
          readonly
        ></v-switch>
      </div>
      <Odontogram
        ref="odontogram"
        :odontogram="evolution.odontogram"
        readonly
      />
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      evolution: {},
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.evolution.date).toLocaleDateString('es-AR')
    },
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
    getItems() {
      const items = [
        {
          text: `Historia clínica`,
          disabled: false,
          href: `/case-history/${this.evolution?.case_history?.patient}`,
        },
        {
          text: `Evolución`,
          disabled: false,
          href: '#',
        },
      ]

      return items
    },
  },
}
</script>

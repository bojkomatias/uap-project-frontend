<template>
  <div>
    <v-container>
      <v-card flat>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mb-2"
            outlined
            @click="$router.push('/patients/new')"
          >
            Nuevo Paciente
          </v-btn>
        </v-toolbar>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar un paciente"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          class=""
          :loading="loadingData"
          :headers="headers"
          :items="patients"
          :search="search"
          flat
        >
          <template #item.action="{ item }" class="mr-0">
            <v-btn
              outlined
              color="primary"
              @click="
                (e) => {
                  e.stopPropagation()
                  $router.push(`/patients/${item.id}`)
                }
              "
            >
              Ver Paciente
            </v-btn>
            <v-btn
              outlined
              color="primary"
              @click="
                (e) => {
                  e.stopPropagation()
                  $router.push(`/case-history/${item.id}`)
                }
              "
            >
              Historia Clinica
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
      loadingData: true,
      search: '',
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Nombre', value: 'first_name' },
        { text: 'Apellido', value: 'last_name' },
        { text: 'Documento', value: 'document' },
        { text: 'Action', value: 'action', width: '400' },
      ],

      patients: [],

      patient: {},
    }
  },

  mounted() {
    this.getAllPacientens()
  },

  methods: {
    async getAllPacientens() {
      const { data } = await this.$axios.get(`patients`)
      this.patients = data
      this.loadingData = false
    },
  },
}
</script>

<style lang="scss" scoped></style>

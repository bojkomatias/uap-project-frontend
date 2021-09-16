<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        :search="search"
        show-expand
      >
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-data-table
              hide-default-footer
              :headers="nestedHeaders"
              :items="item.appointments"
            ></v-data-table>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ID', sortable: false, value: 'id' },

        { text: 'Nombre', value: 'patient.first_name' },
        { text: 'Apellido', value: 'patient.last_name' },
        { text: 'Estudiante', value: 'student.first_name' },
      ],
      orders: [],
      nestedHeaders: [
        { text: 'Turno', value: 'id' },
        { text: 'Fecha', value: 'date' },
        { text: 'Hora', value: 'date' },
      ],
    }
  },
  mounted() {
    this.getAllOrders()
  },
  methods: {
    async getAllOrders() {
      const { data } = await this.$axios.get(`orders`)
      this.orders = data
    },
  },
}
</script>

<style lang="scss" scoped></style>

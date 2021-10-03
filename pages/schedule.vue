<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          append-icon="mdi-close"
          class="ma-6"
          label="Alumno o Practicante"
          @click:append="search = null"
        ></v-text-field>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Fecha"
              prepend-icon="mdi-calendar"
              append-icon="mdi-close"
              class="ma-6"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:append="date = null"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            :first-day-of-week="1"
            locale="es-AR"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredAppointments"
        :search="search"
      >
        <template #[`item.date`]="{ item }">
          {{ new Date(item.date).toISOString().substr(5, 5) }}
        </template>
        <template #[`item.time`]="{ item }">
          <!-- {{ new Date(item.date).toLocaleDateString('es-AR') }} -->
          {{
            new Date(item.date).toLocaleTimeString('es-AR', {
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </template>
        <template #[`item.patient.full_name`]="{ item }">
          {{ `${item.patient.last_name}, ${item.patient.first_name}` }}
        </template>
        <template #[`item.student.full_name`]="{ item }">
          {{ `${item.student.last_name}, ${item.student.first_name}` }}
        </template>
        <template #[`item.payment`]="{ item }">
          <v-simple-checkbox
            :value="!!item.payment"
            disabled
          ></v-simple-checkbox>
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
        { text: 'Turno', sortable: false, value: 'id' },
        { text: 'Fecha', sortable: false, value: 'date' },
        { text: 'Hora', sortable: false, value: 'time' },
        { text: 'Paciente', value: 'patient.full_name' },
        { text: 'Estudiante', value: 'student.full_name' },
        { text: 'Pagado', align: 'center', value: 'payment' },
        { text: 'Acciones', value: 'actions' },
      ],
      appointments: [],
      menu: false,
      date: null,
    }
  },
  computed: {
    filteredAppointments: {
      get() {
        if (!this.date) return this.appointments
        return this.appointments.filter(
          (x) => x.date.substr(0, 10) === this.date
        )
      },
    },
  },
  mounted() {
    this.getAllappointments()
  },
  methods: {
    async getAllappointments() {
      const { data } = await this.$axios.get(`appointments`)
      this.appointments = data
    },
  },
}
</script>

<style lang="scss" scoped></style>

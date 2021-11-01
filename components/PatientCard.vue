<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <v-card class="mx-auto spacing-playground pb-10" max-width="100%" outlined>
    <v-card-text class="d-flex justify-space-between tertiary">
      <p class="text-h4 text--primary pl-5">
        {{ patient.first_name }} {{ patient.last_name }}
      </p>
      <v-btn icon @click="disabled = !disabled">
        <v-icon v-if="disabled == true">mdi-pencil</v-icon>
        <v-icon v-if="disabled == false">mdi-eye</v-icon>
      </v-btn>
    </v-card-text>

    <v-form @submit.prevent="() => $emit('onSubmit')">
      <v-container>
        <v-row class="d-flex justify-space-around">
          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.document"
              label="Documento"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, document: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  :value="patient.dob"
                  label="Fecha de nacimiento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :disabled="disabled"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="patient.dob"
                @change="
                  (value) => $emit('onChange', { ...patient, dob: value })
                "
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.phone"
              label="Cel"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, phone: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-select
              :value="patient.gender"
              :items="genderItems"
              label="Genero"
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, gender: value })
              "
            ></v-select>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.nationality"
              label="Nacionalidad"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, nationality: value })
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-space-around">
          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.city"
              label="Ciudad"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, city: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.country"
              label="País"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, country: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.postalCode"
              label="Código postal"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, postalCode: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.address"
              label="Domicilio"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, address: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              :value="patient.profession"
              label="Profesión/Actividad"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, profession: value })
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="d-flex justify-space-around">
          <v-col cols="10" md="2">
            <v-text-field
              :value="patient.workplace"
              label="Lugar de trabajo"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, workplace: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="10" md="2">
            <v-text-field
              :value="patient.maritalStatus"
              label="Estado civil"
              required
              :disabled="disabled"
              @change="
                (value) =>
                  $emit('onChange', { ...patient, maritalStatus: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="10" md="2">
            <v-text-field
              :value="patient.heathcare"
              label="Ob. Social"
              required
              :disabled="disabled"
              @change="
                (value) => $emit('onChange', { ...patient, heathcare: value })
              "
            ></v-text-field>
          </v-col>

          <v-col cols="10" md="2"> </v-col>

          <v-col cols="10" md="2">
            <v-btn v-if="disabled == false" class="mr-4" type="submit">
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    patient: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      disabled: true,
      genderItems: ['Masculino', 'Femenino'],
    }
  },
}
</script>

<style lang="scss" scoped></style>

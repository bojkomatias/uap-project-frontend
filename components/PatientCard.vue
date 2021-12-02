<template>
  <!-- eslint-disable vue/no-mutating-props -->
  <v-card class="mx-auto spacing-playground" max-width="100%" flat>
    <v-card-text class="d-flex justify-space-between">
      <h1>{{ patient.first_name }} {{ patient.last_name }}</h1>
      <v-card-actions>
        <v-btn v-if="show == true" icon @click="disabled = !disabled">
          <v-icon v-if="disabled == true">mdi-pencil</v-icon>
          <v-icon v-if="disabled == false">mdi-eye</v-icon>
        </v-btn>

        <v-btn icon @click="show = !show">
          <v-icon large>{{
            show ? 'mdi-chevron-up' : 'mdi-chevron-down'
          }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-text>

    <v-expand-transition>
      <div v-show="show">
        <v-form @submit.prevent="() => $emit('onSubmit')">
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col cols="12" :md="isMinimal ? '2' : '6'">
                <v-text-field
                  :value="patient.document"
                  label="Documento"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, document: value })
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
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

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
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

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
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
            </v-row>

            <v-row class="d-flex justify-space-between">
              <v-col cols="12" :md="isMinimal ? '2' : '6'">
                <v-text-field
                  :value="patient.nationality"
                  label="Nacionalidad"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, nationality: value })
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" :md="isMinimal ? '2' : '6'">
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

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
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

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
                <v-text-field
                  :value="patient.postal_code"
                  label="Código postal"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, postal_code: value })
                  "
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-space-between">
              <v-col cols="12" :md="isMinimal ? '2' : '6'">
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

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
                <v-text-field
                  :value="patient.profession"
                  label="Profesión/Actividad"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, profession: value })
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" :md="isMinimal ? '2' : '6'">
                <v-text-field
                  :value="patient.workplace"
                  label="Lugar de trabajo"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, workplace: value })
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="12" :md="isMinimal ? '2' : '6'">
                <v-text-field
                  :value="patient.marital_status"
                  label="Estado civil"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, marital_status: value })
                  "
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="d-flex justify-space-between">
              <v-col cols="2">
                <v-text-field
                  :value="patient.heathcare"
                  label="Ob. Social"
                  required
                  :disabled="disabled"
                  @change="
                    (value) =>
                      $emit('onChange', { ...patient, heathcare: value })
                  "
                ></v-text-field>
              </v-col>

              <v-col cols="8" class="d-flex justify-end align-center">
                <v-btn v-if="disabled == false" class="" type="submit">
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    patient: {
      type: Object,
      default: () => {},
    },
    isMinimal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disabled: true,
      show: false,
      genderItems: ['Masculino', 'Femenino'],
    }
  },
}
</script>

<style lang="scss" scoped></style>

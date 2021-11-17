<template>
    <v-form @submit.prevent="savePatient">
      <v-container>
        <h1>Nuevo Paciente</h1>
        <v-card class="mt-10 pa-10" style="max-width: 700px;">
 
            <v-text-field
              v-model="firstName"
              label="Nombre"
              required
            ></v-text-field>
 
            <v-text-field
              v-model="lastName"
              label="Apellido"
              required
            ></v-text-field>
 
            <v-text-field
              v-model="document"
              label="Documento"
              required
              @change="
                (value) => $emit('onChange', { ...patient, document: value })
              "
            ></v-text-field>
 
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="dob"
                  label="Fecha de nacimiento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  :disabled="disabled"
                  v-on="on"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="dob"
              ></v-date-picker>
            </v-menu>
           
            <v-text-field
              v-model="phone"
              label="Número de Teléfono"
              placeholder="+54 343 1234567"
              required
              :disabled="disabled"
            ></v-text-field>
           
            <v-select
              v-model="gender"
              :items="genderItems"
              label="Genero"
              :disabled="disabled"

            ></v-select>
        <v-row class="d-flex justify-space-around">
            <v-col>
              <v-autocomplete
                :items="countryItems"
                :rules="[v => !!v || 'El país es requerido.']"
                label="País"
                required
                v-model="country"
                item-text="name"
                item-value="name"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field
                v-model="nationality"
                label="Nacionalidad"
                required
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="city"
                label="Ciudad"
                required
                :disabled="disabled"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                v-model="postalCode"
                label="Código postal"
                required
                :disabled="disabled"
              ></v-text-field>
            </v-col>
        </v-row>
           
            <v-text-field
              v-model="address"
              label="Domicilio"
              required
              :disabled="disabled"
            ></v-text-field>

        <v-row class="d-flex justify-space-around">
          <v-col cols="10" md="3">
            <v-text-field
                v-model="profession"
                label="Profesión/Actividad"
                required
                :disabled="disabled"
            ></v-text-field>
          </v-col>

          <v-col cols="10" md="3">
            <v-text-field
              v-model="workplace"
              label="Lugar de trabajo"
              required
              :disabled="disabled"
            ></v-text-field>
          </v-col>

          <v-col cols="10" md="3">
            <v-combobox
              v-model="maritalStatus"
              label="Estado civil"
              required
              :items="maritalStatusItems"
              :disabled="disabled"
            ></v-combobox>
          </v-col>

          <v-col cols="10" md="3">
            <v-text-field
              v-model="heathcare"
              label="Ob. Social"
              required
              :disabled="disabled"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-right">
          <v-col cols="10" md="4">
            <v-btn class="mr-4" primary type="submit">
              Guardar
            </v-btn>
          </v-col>
        </v-row>
        </v-card>
      </v-container>
    </v-form>
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
      disabled: false,
      firstName: '',
      lastName: '',
      document: '',
      dob: '',
      phone: '',
      gender: '',
      nationality: '',
      city: '',
      country: '',
      postalCode: '',
      address: '',
      profession: '',
      workplace: '',
      maritalStatus: '',
      heathcare: '',
      genderItems: ['Masculino', 'Femenino'],
      maritalStatusItems: ['Soltero', 'Casado/a', 'Divorciado/a'],
      countryItems: [{ 'id': 24, 'name': 'Afganistán' },
      { 'id': 25, 'name': 'Alandia' },
      { 'id': 26, 'name': 'Albania' },
      { 'id': 27, 'name': 'Argelia' },
      { 'id': 28, 'name': 'Samoa Americana' },
      { 'id': 29, 'name': 'Andorra' },
      { 'id': 30, 'name': 'Angola' },
      { 'id': 31, 'name': 'Anguilla' },
      { 'id': 32, 'name': 'Antártida' },
      { 'id': 33, 'name': 'Antigua y Barbuda' },
      { 'id': 34, 'name': 'Argentina' },
      { 'id': 35, 'name': 'Armenia' },
      { 'id': 36, 'name': 'Aruba' },
      { 'id': 37, 'name': 'Australia' },
      { 'id': 38, 'name': 'Austria' },
      { 'id': 39, 'name': 'Azerbaiyán' },
      { 'id': 40, 'name': 'Bahamas' },
      { 'id': 41, 'name': 'Bahrein' },
      { 'id': 42, 'name': 'Bangladesh' },
      { 'id': 43, 'name': 'Barbados' },
      { 'id': 44, 'name': 'Bielorrusia' },
      { 'id': 45, 'name': 'Bélgica' },
      { 'id': 46, 'name': 'Belice' },
      { 'id': 47, 'name': 'Benín' },
      { 'id': 48, 'name': 'Bermudas' },
      { 'id': 49, 'name': 'Bután' },
      { 'id': 50, 'name': 'Bolivia' },
      { 'id': 51, 'name': 'Bonaire, Sint Eustatius and Saba' },
      { 'id': 52, 'name': 'Bosnia y Herzegovina' },
      { 'id': 53, 'name': 'Botswana' },
      { 'id': 54, 'name': 'Isla Bouvet' },
      { 'id': 55, 'name': 'Brasil' },
      { 'id': 56, 'name': 'Territorio Británico del Océano Índico' },
      { 'id': 57, 'name': 'Islas Ultramarinas Menores de Estados Unidos' },
      { 'id': 58, 'name': 'Islas Vírgenes del Reino Unido' },
      { 'id': 59, 'name': 'Islas Vírgenes de los Estados Unidos' },
      { 'id': 60, 'name': 'Brunei' },
      { 'id': 61, 'name': 'Bulgaria' },
      { 'id': 62, 'name': 'Burkina Faso' },
      { 'id': 63, 'name': 'Burundi' },
      { 'id': 64, 'name': 'Camboya' },
      { 'id': 65, 'name': 'Camerún' },
      { 'id': 66, 'name': 'Canadá' },
      { 'id': 67, 'name': 'Cabo Verde' },
      { 'id': 68, 'name': 'Islas Caimán' },
      { 'id': 69, 'name': 'República Centroafricana' },
      { 'id': 70, 'name': 'Chad' },
      { 'id': 71, 'name': 'Chile' },
      { 'id': 72, 'name': 'China' },
      { 'id': 73, 'name': 'Isla de Navidad' },
      { 'id': 74, 'name': 'Islas Cocos o Islas Keeling' },
      { 'id': 75, 'name': 'Colombia' },
      { 'id': 76, 'name': 'Comoras' },
      { 'id': 77, 'name': 'Congo' },
      { 'id': 78, 'name': 'Congo (Rep. Dem.)' },
      { 'id': 79, 'name': 'Islas Cook' },
      { 'id': 80, 'name': 'Costa Rica' },
      { 'id': 81, 'name': 'Croacia' },
      { 'id': 82, 'name': 'Cuba' },
      { 'id': 83, 'name': 'Curaçao' },
      { 'id': 84, 'name': 'Chipre' },
      { 'id': 85, 'name': 'República Checa' },
      { 'id': 86, 'name': 'Dinamarca' },
      { 'id': 87, 'name': 'Yibuti' },
      { 'id': 88, 'name': 'Dominica' },
      { 'id': 89, 'name': 'República Dominicana' },
      { 'id': 90, 'name': 'Ecuador' },
      { 'id': 91, 'name': 'Egipto' },
      { 'id': 92, 'name': 'El Salvador' },
      { 'id': 93, 'name': 'Guinea Ecuatorial' },
      { 'id': 94, 'name': 'Eritrea' },
      { 'id': 95, 'name': 'Estonia' },
      { 'id': 96, 'name': 'Etiopía' },
      { 'id': 97, 'name': 'Islas Malvinas' },
      { 'id': 98, 'name': 'Islas Faroe' },
      { 'id': 99, 'name': 'Fiyi' },
      { 'id': 100, 'name': 'Finlandia' },
      { 'id': 101, 'name': 'Francia' },
      { 'id': 102, 'name': 'Guayana Francesa' },
      { 'id': 103, 'name': 'Polinesia Francesa' },
      { 'id': 104, 'name': 'Tierras Australes y Antárticas Francesas' },
      { 'id': 105, 'name': 'Gabón' },
      { 'id': 106, 'name': 'Gambia' },
      { 'id': 107, 'name': 'Georgia' },
      { 'id': 108, 'name': 'Alemania' },
      { 'id': 109, 'name': 'Ghana' },
      { 'id': 110, 'name': 'Gibraltar' },
      { 'id': 111, 'name': 'Grecia' },
      { 'id': 112, 'name': 'Groenlandia' },
      { 'id': 113, 'name': 'Grenada' },
      { 'id': 114, 'name': 'Guadalupe' },
      { 'id': 115, 'name': 'Guam' },
      { 'id': 116, 'name': 'Guatemala' },
      { 'id': 117, 'name': 'Guernsey' },
      { 'id': 118, 'name': 'Guinea' },
      { 'id': 119, 'name': 'Guinea-Bisáu' },
      { 'id': 120, 'name': 'Guyana' },
      { 'id': 121, 'name': 'Haiti' },
      { 'id': 122, 'name': 'Islas Heard y McDonald' },
      { 'id': 123, 'name': 'Santa Sede' },
      { 'id': 124, 'name': 'Honduras' },
      { 'id': 125, 'name': 'Hong Kong' },
      { 'id': 126, 'name': 'Hungría' },
      { 'id': 127, 'name': 'Islandia' },
      { 'id': 128, 'name': 'India' },
      { 'id': 129, 'name': 'Indonesia' },
      { 'id': 130, 'name': 'Costa de Marfil' },
      { 'id': 131, 'name': 'Iran' },
      { 'id': 132, 'name': 'Irak' },
      { 'id': 133, 'name': 'Irlanda' },
      { 'id': 134, 'name': 'Isla de Man' },
      { 'id': 135, 'name': 'Israel' },
      { 'id': 136, 'name': 'Italia' },
      { 'id': 137, 'name': 'Jamaica' },
      { 'id': 138, 'name': 'Japón' },
      { 'id': 139, 'name': 'Jersey' },
      { 'id': 140, 'name': 'Jordania' },
      { 'id': 141, 'name': 'Kazajistán' },
      { 'id': 142, 'name': 'Kenia' },
      { 'id': 143, 'name': 'Kiribati' },
      { 'id': 144, 'name': 'Kuwait' },
      { 'id': 145, 'name': 'Kirguizistán' },
      { 'id': 146, 'name': 'Laos' },
      { 'id': 147, 'name': 'Letonia' },
      { 'id': 148, 'name': 'Líbano' },
      { 'id': 149, 'name': 'Lesotho' },
      { 'id': 150, 'name': 'Liberia' },
      { 'id': 151, 'name': 'Libia' },
      { 'id': 152, 'name': 'Liechtenstein' },
      { 'id': 153, 'name': 'Lituania' },
      { 'id': 154, 'name': 'Luxemburgo' },
      { 'id': 155, 'name': 'Macao' },
      { 'id': 156, 'name': 'Macedonia' },
      { 'id': 157, 'name': 'Madagascar' },
      { 'id': 158, 'name': 'Malawi' },
      { 'id': 159, 'name': 'Malasia' },
      { 'id': 160, 'name': 'Maldivas' },
      { 'id': 161, 'name': 'Mali' },
      { 'id': 162, 'name': 'Malta' },
      { 'id': 163, 'name': 'Islas Marshall' },
      { 'id': 164, 'name': 'Martinica' },
      { 'id': 165, 'name': 'Mauritania' },
      { 'id': 166, 'name': 'Mauricio' },
      { 'id': 167, 'name': 'Mayotte' },
      { 'id': 168, 'name': 'México' },
      { 'id': 169, 'name': 'Micronesia' },
      { 'id': 170, 'name': 'Moldavia' },
      { 'id': 171, 'name': 'Mónaco' },
      { 'id': 172, 'name': 'Mongolia' },
      { 'id': 173, 'name': 'Montenegro' },
      { 'id': 174, 'name': 'Montserrat' },
      { 'id': 175, 'name': 'Marruecos' },
      { 'id': 176, 'name': 'Mozambique' },
      { 'id': 177, 'name': 'Myanmar' },
      { 'id': 178, 'name': 'Namibia' },
      { 'id': 179, 'name': 'Nauru' },
      { 'id': 180, 'name': 'Nepal' },
      { 'id': 181, 'name': 'Países Bajos' },
      { 'id': 182, 'name': 'Nueva Caledonia' },
      { 'id': 183, 'name': 'Nueva Zelanda' },
      { 'id': 184, 'name': 'Nicaragua' },
      { 'id': 185, 'name': 'Níger' },
      { 'id': 186, 'name': 'Nigeria' },
      { 'id': 187, 'name': 'Niue' },
      { 'id': 188, 'name': 'Isla de Norfolk' },
      { 'id': 189, 'name': 'Corea del Norte' },
      { 'id': 190, 'name': 'Islas Marianas del Norte' },
      { 'id': 191, 'name': 'Noruega' },
      { 'id': 192, 'name': 'Omán' },
      { 'id': 193, 'name': 'Pakistán' },
      { 'id': 194, 'name': 'Palau' },
      { 'id': 195, 'name': 'Palestina' },
      { 'id': 196, 'name': 'Panamá' },
      { 'id': 197, 'name': 'Papúa Nueva Guinea' },
      { 'id': 198, 'name': 'Paraguay' },
      { 'id': 199, 'name': 'Perú' },
      { 'id': 200, 'name': 'Filipinas' },
      { 'id': 201, 'name': 'Islas Pitcairn' },
      { 'id': 202, 'name': 'Polonia' },
      { 'id': 203, 'name': 'Portugal' },
      { 'id': 204, 'name': 'Puerto Rico' },
      { 'id': 205, 'name': 'Catar' },
      { 'id': 206, 'name': 'Kosovo' },
      { 'id': 207, 'name': 'Reunión' },
      { 'id': 208, 'name': 'Rumania' },
      { 'id': 209, 'name': 'Rusia' },
      { 'id': 210, 'name': 'Ruanda' },
      { 'id': 211, 'name': 'San Bartolomé' },
      { 'id': 212, 'name': 'Santa Helena' },
      { 'id': 213, 'name': 'San Cristóbal y Nieves' },
      { 'id': 214, 'name': 'Santa Lucía' },
      { 'id': 215, 'name': 'Saint Martin' },
      { 'id': 216, 'name': 'San Pedro y Miquelón' },
      { 'id': 217, 'name': 'San Vicente y Granadinas' },
      { 'id': 218, 'name': 'Samoa' },
      { 'id': 219, 'name': 'San Marino' },
      { 'id': 220, 'name': 'Santo Tomé y Príncipe' },
      { 'id': 221, 'name': 'Arabia Saudí' },
      { 'id': 222, 'name': 'Senegal' },
      { 'id': 223, 'name': 'Serbia' },
      { 'id': 224, 'name': 'Seychelles' },
      { 'id': 225, 'name': 'Sierra Leone' },
      { 'id': 226, 'name': 'Singapur' },
      { 'id': 227, 'name': 'Sint Maarten (Dutch part)' },
      { 'id': 228, 'name': 'República Eslovaca' },
      { 'id': 229, 'name': 'Eslovenia' },
      { 'id': 230, 'name': 'Islas Salomón' },
      { 'id': 231, 'name': 'Somalia' },
      { 'id': 232, 'name': 'República de Sudáfrica' },
      { 'id': 233, 'name': 'Islas Georgias del Sur y Sandwich del Sur' },
      { 'id': 234, 'name': 'Corea del Sur' },
      { 'id': 235, 'name': 'Sudán del Sur' },
      { 'id': 236, 'name': 'España' },
      { 'id': 237, 'name': 'Sri Lanka' },
      { 'id': 238, 'name': 'Sudán' },
      { 'id': 239, 'name': 'Surinam' },
      { 'id': 240, 'name': 'Islas Svalbard y Jan Mayen' },
      { 'id': 241, 'name': 'Suazilandia' },
      { 'id': 242, 'name': 'Suecia' },
      { 'id': 243, 'name': 'Suiza' },
      { 'id': 244, 'name': 'Siria' },
      { 'id': 245, 'name': 'Taiwán' },
      { 'id': 246, 'name': 'Tayikistán' },
      { 'id': 247, 'name': 'Tanzania' },
      { 'id': 248, 'name': 'Tailandia' },
      { 'id': 249, 'name': 'Timor Oriental' },
      { 'id': 250, 'name': 'Togo' },
      { 'id': 251, 'name': 'Islas Tokelau' },
      { 'id': 252, 'name': 'Tonga' },
      { 'id': 253, 'name': 'Trinidad y Tobago' },
      { 'id': 254, 'name': 'Túnez' },
      { 'id': 255, 'name': 'Turquía' },
      { 'id': 256, 'name': 'Turkmenistán' },
      { 'id': 257, 'name': 'Islas Turks y Caicos' },
      { 'id': 258, 'name': 'Tuvalu' },
      { 'id': 259, 'name': 'Uganda' },
      { 'id': 260, 'name': 'Ucrania' },
      { 'id': 261, 'name': 'Emiratos Árabes Unidos' },
      { 'id': 262, 'name': 'Reino Unido' },
      { 'id': 263, 'name': 'Estados Unidos' },
      { 'id': 264, 'name': 'Uruguay' },
      { 'id': 265, 'name': 'Uzbekistán' },
      { 'id': 266, 'name': 'Vanuatu' },
      { 'id': 267, 'name': 'Venezuela' },
      { 'id': 268, 'name': 'Vietnam' },
      { 'id': 269, 'name': 'Wallis y Futuna' },
      { 'id': 270, 'name': 'Sahara Occidental' },
      { 'id': 271, 'name': 'Yemen' },
      { 'id': 272, 'name': 'Zambia' },
      { 'id': 273, 'name': 'Zimbabue' }
    ]
    }
  },
  methods: {
    async savePatient() {
      const patient = {};
      patient.first_name = this.firstName;
      patient.last_name = this.lastName;
      patient.document = this.document;
      patient.dob = this.dob;
      patient.phone = this.phone;
      patient.gender = this.gender;
      patient.nationality = this.nationality;
      patient.city = this.city;
      patient.country = this.country;
      patient.postal_code = this.postalCode;
      patient.address = this.address;
      patient.profession = this.profession;
      patient.workplace = this.workplace;
      patient.marital_status = this.maritalStatus;
      patient.healthcare = this.heathcare;

      const res = await this.$axios.post(`patients`, patient)
      if(res.status === 200){
          this.$router.push('/patients/'+res.data.id);
      }
    },
  }
}
</script>

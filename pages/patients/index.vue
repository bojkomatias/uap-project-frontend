<template>
    <div>
        <template>           
            <v-container>
                <v-card>
                    <template>
                        <v-toolbar flat>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" class="mb-2" @click="$router.push('/patients/new')">
                                Nuevo Paciente
                            </v-btn>            
                        </v-toolbar>
                    </template>
                    <v-card-title>
                        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar un paciente" single-line hide-details></v-text-field>
                    </v-card-title>               
                    <v-data-table :loading="loadingData" :headers="headers" :items="patients" @click:row="verPaciente" :search="search"></v-data-table>
                </v-card>                       
            </v-container>
        </template>
    </div>    
</template>

<script>

    export default {
        data () {
        return {
            loadingData: true,
            search: '',
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'Nombre', value: 'first_name'},
                {text: 'Apellido', value: 'last_name'},
                {text: 'Documento', value: 'document'} 
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
                const {data} = await this.$axios.get(`patients`)
                this.patients = data
                this.loadingData = false
            },
            verPaciente(dato, item){
                this.$router.push('/patients/'+dato.id);
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
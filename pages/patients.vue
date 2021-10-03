<template>
    <div>
        <template>           
            <v-card>
                <template>
                    <v-toolbar flat>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                New Item
                                </v-btn>
                            </template>
                            <!-- Modal de carga -->
                            <v-card>
                                <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        Modal de carga
                                        <form>
                                            <input v-model="patient.first_name" type="text" />
                                            <input v-model="patient.last_name" type="text" />
                                            <input v-model="patient.document" type="text" />
                                        </form>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close" >
                                        Cancel
                                    </v-btn>
                                    <v-btn color="blue darken-1" type="submit">
                                        Save
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>              
                    </v-toolbar>
                </template>
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
                </v-card-title>               
                <v-data-table :headers="headers" :items="patients" :search="search"></v-data-table>
            </v-card>                       
        </template>
    </div>    
</template>

<script>

    export default {
        data () {
        return {
            search: '',
            headers: [
                {text: 'ID', value: 'id', sortable: false},
                {text: 'Nombre', value: 'first_name'},
                {text: 'Apellido', value: 'last_name'},
                {text: 'Ordenes', value: 'orders'} 
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
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
<template>
    <div id="admin">
        <Sidebar/>
        <div class="content" v-bind:style="{ 'margin-left': sidebarWidth + 'px' }">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row class="text-center">
                        <v-col cols="12">
                            <h2 class="font-weight-bold white-text mb-3" style="color: #52bd95;">CREAR PELÍCULA</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="8" offset-sm="2">
                            <v-text-field
                                v-model="form.name"
                                label="Nombre"
                                prepend-inner-icon="mdi-video"
                                outlined
                                required
                                dark
                                :rules="rules.name"
                            />
                        </v-col>
                        <v-col cols="6" sm="4" offset-sm="2">
                            <v-text-field
                                v-model="form.price"
                                label="Valor Ticket"
                                prepend-inner-icon="mdi-currency-usd"
                                type="number"
                                outlined
                                required
                                dark
                                :rules="rules.price"
                            />
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-text-field
                                v-model="form.max_num"
                                label="Asientos"
                                prepend-inner-icon="mdi-seat"
                                type="number"
                                outlined
                                required
                                dark
                                :rules="rules.max_num"
                            />
                        </v-col>
                        <v-col cols="12" sm="8" offset-sm="2">
                            <v-file-input
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Seleccione una imágen para cartelera"
                                prepend-inner-icon="mdi-file-image"
                                prepend-icon=""
                                label="Imagen"
                                outlined
                                required
                                dark
                            />
                        </v-col>
                        <v-col cols="12" sm="8" offset-sm="2">
                            <v-btn @click="submit" large class="mr-4 fw-900" color="#52bd95" :disabled="!valid">CREAR PELÍCULA</v-btn>
                            <v-btn outlined dark>CANCELAR</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar'
    import axios from '@/axios'

    export default {
        name: 'NewMovie',
        components: {
            Sidebar,
        },
        data: () => ({
            name: '',
            sidebarWidth: '',
            valid: false,
            form: {
                name: '',
                price: null,
                max_num: null
            },
            rules: {
                name: [
                    v => !!v || 'El nombre es requerido',
                    v => (v && v.length >= 3) || 'El nombre debe tener al menos 3 letras',
                ],
                price: [
                    v => !!v || 'El valor del ticket es requerido',
                    v => (v && v >= 5000) || 'El precio no debe ser menor a $5.000',
                    v => (v && v % 500 == 0) || 'El precio debe ser múltiplo de $500',
                ],
                max_num: [
                    v => !!v || 'El número de asientos es requerido',
                    v => (v && v <= 25) || 'La sala más grande tiene 25 asientos'
                ]
            }
        }),
        mounted() {
            this.$nextTick(function () {
                var parentElement = document.getElementById('admin');
                if (parentElement.clientWidth > 1263) {
                    this.sidebarWidth = parentElement.querySelector('.sidebar').clientWidth;
                }
            });
            this.valid = false;
            console.log(this.valid);
        },
        methods: {
            submit () {
                this.$refs.form.validate();
                if (this.valid) {
                    axios.post('/storeMovie', this.form)
                        .then((res)=>{
                            console.log('sirvio');
                            console.log(res);
                        }, 200);
                }
            }
        }
    };
</script>

<style>
    #admin {
        min-height: 100%;
    }

    .fw-900 {
        font-weight: 900;
    }

    .v-input__prepend-inner {
        padding-right: 10px!important;
    }
</style>
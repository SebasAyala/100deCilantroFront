<template>
    <v-container>
        <v-form ref="form" v-model="valid">
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
                            v-model="form.picture"
                            accept="image/*"
                            label="Imagen"
                            placeholder="Seleccione una imágen para cartelera"
                            prepend-icon=""
                            prepend-inner-icon="mdi-file-image"
                            ref="picture"
                            dark
                            outlined
                            required
                            show-size
                            :rules="rules.picture"
                        />
                    </v-col>
                    <v-col cols="12" sm="8" offset-sm="2">
                        <v-subheader dark style="height:30px">Seleccionar horarios</v-subheader>
                        <v-chip-group
                            v-model="form.schedules"
                            column
                            multiple
                            dark
                            required
                        >
                            <v-chip v-for="schedule in schedules" :key="schedule" small :value="schedule">
                                {{ schedule }}
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                    <v-col cols="12" sm="8" offset-sm="2">
                        <v-btn @click="submit" large class="mr-4 fw-900" color="#52bd95">CREAR PELÍCULA</v-btn>
                        <v-btn outlined dark href="#/admin/movies">CANCELAR</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-snackbar class="alert-wrong" v-model="snackbarError" dark right top :timeout="6000">
            <p class="mb-0"><v-icon class="mr-3">mdi-alert-circle</v-icon><span class="alert-wrong-text" v-text="snackbarErrorMsg"></span></p>
            <v-btn icon @click="snackbarError = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
    import axios from '../axios'

    export default {
        name: 'NewMovie',
        data: () => ({
            name: '',
            sidebarWidth: '',
            snackbarError: false,
            snackbarErrorMsg: '',
            valid: false,
            form: {
                name: '',
                price: null,
                max_num: null,
                picture: null,
                schedules: []
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
                ],
                picture: [
                    v => !!v || 'La imágen es requerida',
                    v => (v && v.size < 2000000) || 'La imagen debe pesar menos de 2MB'
                ]
            },
            schedules: [
                '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
            ]
        }),
        mounted() {
            this.$nextTick(function () {
                var parentElement = document.getElementById('admin');
                if (parentElement.clientWidth > 1263) {
                    this.sidebarWidth = parentElement.querySelector('.sidebar').clientWidth;
                }
            });
            this.valid = false;
        },
        methods: {
            submit () {
                this.$refs.form.validate();
                if (this.valid) {
                    if (this.form.schedules.length >= 1) {
                        if (this.form.schedules.length <= 5) {
                            let formData = new FormData()
                            formData.append('name', this.form.name)
                            formData.append('max_num', this.form.max_num)
                            formData.append('price', this.form.price)
                            formData.append('picture', this.form.picture)
                            for (var i = 0; i < this.form.schedules.length; i++) {
                                formData.append('schedules[]', this.form.schedules[i]);
                            }
                            axios.post('storeMovie', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then(()=>{
                                    this.$store.dispatch('allMovies')
                                    this.$router.replace('/admin/movies')
                                }, 200)
                                .catch((err)=>{
                                    this.snackbarError = true
                                    this.snackbarErrorMsg = 'Error: ' + err.message
                                })
                        } else {
                            this.snackbarError = true
                            this.snackbarErrorMsg = 'Máximo 5 funciones'
                        }
                    } else {
                        this.snackbarError = true
                        this.snackbarErrorMsg = 'Selecciona los horarios'
                    }
                } else {
                    this.snackbarError = true
                    this.snackbarErrorMsg = 'Revisa el formulario'
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

    .alert-wrong .v-snack__content {
        background-color: rgb(193, 5, 5);
    }

    .alert-wrong i.v-icon {
        color: white;
    }

    .alert-wrong .alert-wrong-text {
        font-family: 'Geogrotesque';
        text-transform: uppercase;
        font-weight: 500;
    }
</style>
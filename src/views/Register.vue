<template>
    <div id="register">
        <div class="content">
            <v-form ref="form" v-model="valid">
                <v-container>
                    <v-row class="text-center">
                        <v-col cols="12">
                            <h2 class="font-weight-bold white-text mb-3" style="color: #52bd95;">REGISTRO DE USUARIOS</h2>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" sm="4" offset-sm="2">
                            <v-text-field
                                v-model="form.name"
                                label="Nombres"
                                outlined
                                required
                                dark
                                :rules="rules.name"
                            />
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-text-field
                                v-model="form.lastname"
                                label="Apellidos"
                                outlined
                                required
                                dark
                                :rules="rules.lastname"
                            />
                        </v-col>
                        <v-col cols="6" sm="4" offset-sm="2">
                            <v-text-field
                                v-model="form.email"
                                label="Email"
                                prepend-inner-icon="mdi-email"
                                type="email"
                                outlined
                                required
                                dark
                                :error="mail.err"
                                :error-messages="mail.msg"
                                :rules="rules.email"
                            />
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-text-field
                                v-model="form.phone"
                                label="Teléfono"
                                prepend-inner-icon="mdi-phone"
                                type="tel"
                                outlined
                                required
                                dark
                                :rules="rules.phone"
                            />
                        </v-col>
                        <v-col cols="6" sm="4" offset-sm="2">
                            <v-text-field 
                                v-model="form.password_1"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show1 ? 'text' : 'password'"
                                label="Contraseña"
                                outlined
                                required
                                dark
                                :rules="rules.password_1"
                                @click:append="show1 = !show1"
                                @keyup="form.password = ''"
                            />
                        </v-col>
                        <v-col cols="6" sm="4">
                            <v-text-field 
                                v-model="form.password"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show2 ? 'text' : 'password'"
                                label="Confirmación de Contraseña"
                                outlined
                                required
                                dark
                                :error="pass.err"
                                :error-messages="pass.msg"
                                :rules="[
                                    () => !!form.password || 'Debes confirmar la contraseña',
                                    confirmPass
                                ]"
                                @click:append="show2 = !show2"
                            />
                        </v-col>
                        <v-col cols="12" sm="8" offset-sm="2">
                            <v-subheader dark style="height:30px">Seleccionar Avatar</v-subheader>
                            <v-item-group mandatory active-class="selected-avatar" v-model="form.picture">
								<v-container>
									<v-row>
										<v-col v-for="n in 8" :key="n" cols="4" md="3" lg="2">
											<v-item v-slot:default="{ active, toggle }" :value="n + '.svg'">
												<v-img
													class="select-avatar"
													:src="'images/avatars/' + n + '.svg'"
													@click="toggle"
												></v-img>
											</v-item>
										</v-col>
									</v-row>
								</v-container>
							</v-item-group>
                        </v-col>
                        <v-col cols="12" sm="8" offset-sm="2">
                            <v-btn @click="submit" large class="mr-4 fw-900" color="#52bd95">REGISTRARSE</v-btn>
                            <v-btn outlined dark href="#/">CANCELAR</v-btn>
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
        </div>
    </div>
</template>

<script>
    import axios from '../axios'

    export default {
        name: 'Register',
        data() {
            return {
                snackbarError: null,
                snackbarErrorMsg: '',
                show1: false,
                show2: false,
                valid: null,
                form: {
                    name: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    password_1: '',
                    password: '',
                    picture: ''
                },
                pass: {
                    msg: '',
                    err: false,
                },
                mail: {
                    msg: '',
                    err: false,
                },
                rules: {
                    name: [
                        v => !!v || 'El nombre es requerido',
                        v => (v && v.length >= 3) || 'Debe tener al menos 3 letras',
                    ],
                    lastname: [
                        v => !!v || 'El apellido es requerido',
                        v => (v && v.length >= 3) || 'Debe tener al menos 3 letras',
                    ],
                    email: [
                        v => !!v || 'El email es requerido',
                        v => (v && v.length >= 3) || 'Debe tener al menos 3 letras',
                        v => new RegExp('[^@]+@[^@]+\\.[^@]+').test(v) || 'El email no es válido',
                        this.validateMail
                    ],
                    phone: [
                        v => !!v || 'El teléfono es requerido',
                        v => (v && v.length >= 7) || 'Debe tener al menos 7 números',
                        v => (v && v.length <= 10) || 'Debe tener máximo 10 números',
                        v => new RegExp('^[0-9]*$').test(v) || 'El teléfono no es válido'
                    ],
                    password_1: [
                        v => !!v || 'Debes ingresar una contraseña',
                        v => (v && v.length >= 8) || 'Debe tener al menos 8 caracteres',
                        v => new RegExp('^(?=.*[a-z])').test(v) || 'Debe tener al menos 1 minúscula',
                        v => new RegExp('^(?=.*[A-Z])').test(v) || 'Debe tener al menos 1 mayúscula',
                        v => new RegExp('^(?=.*[0-9])').test(v) || 'Debe tener al menos 1 número'
                    ]
                }
            }
        },
        mounted() {
            if (this.getStatusLogin) {
                this.$router.replace('/')
            }
            this.valid = false;
        },
        methods: {
            confirmPass () {
                this.pass.msg = this.form.password && this.form.password != this.form.password_1
                    ? 'Las contraseñas no coinciden'
                    : ''
                return true
            },
            async validateMail() {
                let result
                if(this.form.email != ''){
                    const regExp = new RegExp('[^@]+@[^@]+\\.[^@]+')
                    if(regExp.test(this.form.email)){
                        result = await axios.get('validateMail/' + this.form.email)
                            .then((res) => {
                                return res.data
                            })
                    }
                }
                this.mail.msg = this.form.email && result
                    ? 'El email ya está registrado'
                    : ''
                return true
            },
            submit () {
                this.$refs.form.validate();
                if (this.valid) {
                    let formData = new FormData()
                    formData.append('name', this.form.name)
                    formData.append('lastname', this.form.lastname)
                    formData.append('email', this.form.email)
                    formData.append('phone', this.form.phone)
                    formData.append('picture', this.form.picture)
                    formData.append('password', this.form.password)
                    axios.post('signin', formData)
                        .then((res) => {
                            console.log(res)
                            this.$router.replace('/login')
                        })
                        .catch((err) => {
                            console.log(err.config)
                        })
                } else {
                    this.snackbarError = true
                    this.snackbarErrorMsg = 'Revisa el formulario'
                }
            }
        }
    };
</script>

<style>
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
	
	#register .select-avatar.v-image {
		border: solid 6px transparent;
		border-radius: 50%;
		cursor: pointer;
		transform: scale(0.9);
		transition: 0.5s;
	}

	#register .select-avatar.v-image:hover {
		transform: scale(1);
	}

	#register .select-avatar.v-image.selected-avatar {
		background-color: #52bd95;
		border-color: #52bd95;
		transform: scale(1);
	}
</style>
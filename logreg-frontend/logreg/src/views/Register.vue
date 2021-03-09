<template>
    <v-app>
        <v-container
            class="fill-height"
        >
            <v-row 
                justify="space-around"
            >
                <v-flex xs12 md6>
                    <v-card
                        id="register"
                        class="primary"
                    >
                    <v-card-title class="secondary">
                        <h2>Register</h2>
                    </v-card-title>
                    <v-card-text class="white">
                        <v-text-field label="Username" v-model="input.username" prepend-icon="mdi-account"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="input.password" prepend-icon="mdi-lock"></v-text-field>
                        <v-text-field label="Password (again)" type="password" v-model="input.password_check" prepend-icon="mdi-lock"></v-text-field>
                        <v-btn v-on:click="register()" class="secondary">Register</v-btn>
                    </v-card-text>
                    </v-card>
                    Already have an account?
                   <router-link to="/login" style="text-decoration:none;"><h2>Login</h2></router-link>
                    <br>
                    <v-btn
                        class="secondary"
                    >
                        <router-link to="/" style="text-decoration:none;" class="white--text"><h2>Return Home</h2></router-link>
                    </v-btn>
                </v-flex>
            </v-row>
        </v-container>
    </v-app>
</template> 

<script>
export default {
        name: 'Register',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    password_check:""
                }
            }
        },
        methods: {
            async register() {
                if(this.input.username != "" && this.input.password != "") {
                    if(this.input.password == this.input.password_check) {
                        let currentObj = this;
                        await this.axios.post('http://localhost:3000/userController/register', {
                            username: this.input.username,
                            psswd: this.input.password
                        })
                        .then(
                            this.$router.push('/')
                        )
                        .catch(function (error) {
                            currentObj.output = error;
                        })
                    }
                   else {
                       alert('inconsistent passwords');
                   }
                } else {
                    alert("Enter valid username or password");
                }
            }
        }
    }
</script>

<style scoped>
    #register{
    border-radius: 15px;
    padding: 25px;
    margin: 50px;
    font-size: 20px;
  }
</style>


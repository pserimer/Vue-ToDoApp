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
                        id="login"
                        class="primary"
                    >
                    <v-card-title class="secondary">
                        <h2>Login</h2>
                    </v-card-title>
                    <v-card-text class="white">
                        <v-text-field label="Username" v-model="input.username" prepend-icon="mdi-account"></v-text-field>
                        <v-text-field label="Password" type="password" v-model="input.password" prepend-icon="mdi-lock"></v-text-field>
                        <v-btn v-on:click="login()" class="secondary">Login</v-btn>
                    </v-card-text>
                    </v-card>
                    Don't have an account?
                   <router-link to="/register" style="text-decoration:none;"><h2>Register</h2></router-link>
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
    data(){
        return {
            input: {
                    username: "",
                    password: ""
            }
        }
    },
    methods: {
            async login() {
                if(this.input.username != "" && this.input.password != "") {
                        this.axios.post('http://localhost:3000/userController/login', {
                        username: this.input.username,
                        psswd: this.input.password
                    })
                    .then(response => {
                        this.$store.commit('setToken',response.data)
                        this.$router.push("/list")
                    })
                    .catch(error => {
                        this.output = error;
                        console.log(this.output);
                    })
                }
                else {
                    alert("Enter valid username or password");
                }
            }
    }
}
</script>

<style scoped>
    #login{
        border-radius: 15px;
        color: black;
        padding: 25px;
        margin: 50px;
        font-size: 20px;
  }
 </style>
<template>
  <v-app>
    <v-container class="fill-height" fluid>
        <div>
            <v-card class="primary" width="450px">
               <v-card-title class="justify-center">
                    <router-link to="/login" style="text-decoration:none;" class="white--text">
                    <h2>Login</h2>
                    </router-link>
                </v-card-title>
            </v-card>
            <br />
            <br />
            <v-card outlined class="primary" width="450px">
                 <v-card-title class="justify-center">
                    <router-link to="/register" style="text-decoration:none;" class="white--text">
                    <h2>Register</h2>
                    </router-link>
                </v-card-title>
            </v-card>
        </div>
        <v-img :src='image.url' width="200px"></v-img>
    </v-container>
  </v-app>
</template>

<script>
export default {
    data(){
        return {
            image: {
                url: require('../assets/background.jpg')
            }
        }
    }
}
</script>

<template>
    <v-app-bar app class="primary">
        <v-toolbar-title class="white--text" center>
            <span>TODO LIST</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-on:click="logout()" class="blue lighten-2 white--text">
            <span>LOGOUT</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        logout(){
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }
}
</script>
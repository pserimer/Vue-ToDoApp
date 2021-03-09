<template>
    <v-dialog v-model="dialogsearch"  max-width="290">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="secondary white--text">Search</v-btn>
        </template>
        <v-card>
            <v-card-title>Search {{ this.obj.from }}</v-card-title>
            <v-card-text>
                <v-text-field v-model="input.query"></v-text-field>
            </v-card-text>
                <v-card-actions>
                    <v-btn color="green darken-1" text v-on:click="search()">Search</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text v-on:click="dialogsearch = false">Cancel</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog> 
</template>

<script>
export default {
    props: ['obj'],
    data () {
        return {
            list: [],
            input: {
                query: ""
            },
            dialogsearch: false
        }
    },
    methods: {
        async search () {
            try {
                if(this.obj.from == 'list') {
                    const response = await this.axios.post('http://localhost:3000/listController/lists/search', {
                        query: this.input.query
                    })

                    for(let element of response.data){
                        this.list.push(element);
                    }
                }
                
                else if(this.obj.from == 'items'){
                    const response = await this.axios.post('http://localhost:3000/itemController/lists/'+this.$router.history.current.params.listid+'/items'+'/search', {
                        query: this.input.query
                    })

                    for(let element of response.data){
                        this.list.push(element);
                    }
                }
                this.$emit("refresh", this.list)
            }
            catch (error){
                console.log(error);
            }
        }
    }
}
</script>
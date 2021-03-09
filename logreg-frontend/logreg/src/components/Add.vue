<template>
    <v-dialog v-model="dialogadd"  max-width="290">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="secondary white--text">Add new list / item</v-btn>
        </template>
        <v-card>
            <v-card-title>Add new {{ this.obj.from }}</v-card-title>
            <v-card-text>
                <v-text-field v-model="input.newName"></v-text-field>
            </v-card-text>
                <v-card-actions>
                    <v-btn color="green darken-1" text v-on:click="addFunct()">Save Changes</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text v-on:click="dialogadd = false">Cancel</v-btn>
                </v-card-actions>
        </v-card>
    </v-dialog> 
</template>

<script>
export default {
    props: ['obj'],
    data () {
        return {
            input: {
                newName: ""
            },
            dialogadd: false
        }
    },
    methods: {
        async addFunct(){
            this.dialogadd = false;
            try {
                if(this.obj.from == 'list') {
                    await this.axios.post('http://localhost:3000/listController/lists', {
                        listname: this.input.newName
                    })
                }
                
                else if(this.obj.from == 'items'){
                    await this.axios.post('http://localhost:3000/itemController/lists/'+this.$router.history.current.params.listid+'/items', {
                        itemname: this.input.newName
                    })
                }
                this.$emit("refresh")
            }
            catch (error){
                console.log(error);
            }
        }
    }
}
</script>
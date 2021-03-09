<template>
    <v-dialog v-model="dialogupdate"  max-width="290">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="secondary"><v-icon>mdi-pencil</v-icon></v-btn>
        </template>
        <v-card>
            <v-card-title>Update</v-card-title>
            <v-card-text>
                <v-text-field v-model="input.newName"></v-text-field>
            </v-card-text>
                <v-card-actions>
                    <v-btn color="green darken-1" text @click="dialogupdate = false" v-on:click="updateFunct()">Save Changes</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text v-on:click="dialogupdate = false">Cancel</v-btn>
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
            dialogupdate: false
        }
    },
    methods: {
        async updateFunct () {
            try {
                if(this.obj.from == 'list') {
                    await this.axios.patch('http://localhost:3000/listController/lists/'+this.obj.id+'/update', {
                        id: this.obj.id,
                        listname: this.input.newName
                    })
                }
                
                else if(this.obj.from == 'items'){
                    await this.axios.patch('http://localhost:3000/itemController/lists/'+this.$router.history.current.params.listid+'/items/'+this.obj.id+'/update', {
                        id: this.obj.id,
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
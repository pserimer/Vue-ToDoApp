<template>
    <v-dialog v-model="dialogdelete"  max-width="290">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" class="secondary"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
        <v-card>
            <v-card-title>Are you sure to delete this?</v-card-title>
            <v-card-actions>
                <v-btn color="red darken-1" text @click="dialogdelete = false" v-on:click="deleteFunct()">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text v-on:click="dialogdelete = false">Cancel</v-btn>
            </v-card-actions>
        </v-card>           
    </v-dialog>
</template>

<script>
export default {
    props: ['obj'],
    data () {
        return {
            dialogdelete: false
        }
    },
    methods: {  
         async deleteFunct () {
             try {
                if(this.obj.from == 'list'){
                    await this.axios.delete('http://localhost:3000/listController/lists/'+this.obj.id)
                } 
                
                else if(this.obj.from == 'items') {
                    await this.axios.delete('http://localhost:3000/itemController/lists/'+this.$router.history.current.params.listid+'/items/'+this.obj.id)
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

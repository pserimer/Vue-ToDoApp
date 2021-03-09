<template>
    <v-app>
        <Nav />
        <br>
        <br>
        <v-container class="my-8">
            <Add v-bind:obj="{from: 'items', id: '0'}" @refresh="getItems"/>
            <br>
            <br>
            <!--
            <div v-for="item in items" v-bind:key="item.id">
            <v-card class="pa-3">
                <v-layout row wrap>
                    <v-flex md4>
                        {{ item.itemname }}
                    </v-flex>
                    <v-flex md2>
                        <Update v-bind:obj="{from: 'items', id: item.id}" @refreshItem="getItems"/>
                    </v-flex>
                    <v-flex md2>
                        <Delete v-bind:obj="{from: 'items', id: item.id}" @refreshItem="getItems"/>
                    </v-flex>
                    <v-flex md2>
                        <v-chip>
                            {{ item.status }}
                        </v-chip> 
                    </v-flex>    
                    <v-flex md2>
                        <v-btn v-on:click="change(item.id, item.status)">change status</v-btn>
                    </v-flex>
                </v-layout>         
            </v-card>
            </div>
            -->
            <v-card class="pa-4 primary">
                <v-data-table
                    :headers="headers"
                    :items="items"
                    :items-per-page="5"
                >
                    <template v-slot:[`item.actions`]="{ item }">
                        <Update v-bind:obj="{from: 'items', id: item.id}" @refresh="getItems"/>     
                        <Delete v-bind:obj="{from: 'items', id: item.id}" @refresh="getItems"/>     
                    </template>
                    <template v-slot:[`item.changeStatus`]="{ item }">
                        <v-btn v-on:click="change(item.id, item.status)" class="secondary white--text">change status</v-btn>
                    </template>
                </v-data-table>
            </v-card>
            <br>
            <br>
            <v-btn v-on:click="prev()" class="float-right secondary white--text">return back to lists</v-btn>
        </v-container>
    </v-app>    
</template>

<script>
import Update from '../components/Update.vue'
import Delete from '../components/Delete.vue'
import Nav from '../components/Nav.vue'
import Add from '../components/Add.vue'

export default {
    components: { Update, Delete, Nav, Add },
    data () {
        return {
            obj: {},
            items: [],
            headers: [
                { text: 'Item',   value: 'itemname', align:'center'},
                { text: 'Status', value: 'status', align:'center'},
                { text: 'Change Status', value: 'changeStatus', align:'center'},
                { text: 'Actions', value: 'actions', align:'center'}
            ]
        }
    }, 
    async mounted () {
        this.getItems();
    },
    methods: {
        async getItems() {
            this.items = [];
            const response = await this.axios.get('http://localhost:3000/itemController/lists/'+this.$router.history.current.params.listid+'/items')
            for(let element of response.data){
                this.items.push(element);
            }
        },
        prev () {
            this.$router.go(-1);
        },
        async change(itemid, status) {
            let changeStat = null;
            if(status === 'ongoing') {
                changeStat = 'completed';
            }
            else if(status === 'completed') {
                changeStat = 'ongoing';
            }
            await this.axios.patch('http://localhost:3000/itemController/lists/'+this.$router.history.current.params.listid+'/items/'+itemid+'/status', {
                status: changeStat
            })
            this.getItems();
        }
    }
}
</script>


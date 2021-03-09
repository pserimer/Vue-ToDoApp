<template>
    <v-app>
        <Nav />
        <br>  
        <br>
        <v-container class="my-8">
            <Search v-bind:obj="{from: 'list', id: '0'}" @refresh="searchList"/>
            <Add v-bind:obj="{from: 'list', id: '0'}" @refresh="getList"/>
            <br>
            <v-card class="pa-4 primary">
                <v-data-table 
                    :headers="headers"
                    :items="lists"
                    :items-per-page="5"
                >
                    <template v-slot:[`item.gotoItems`]="{ item }">
                        <v-btn v-on:click="navToItems(item.id)" class="secondary white--text"> go to list items</v-btn>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <Update v-bind:obj="{from: 'list', id: item.id}" @refresh="getList"/>
                        <Delete v-bind:obj="{from: 'list', id: item.id}" @refresh="getList"/>
                    </template>
                    <v-divider></v-divider>
                </v-data-table>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
import Nav from '../components/Nav.vue'
import Update from '../components/Update.vue'
import Delete from '../components/Delete.vue'
import Add from '../components/Add.vue'
import Search from '../components/Search.vue'

export default {
    components: { Nav, Update, Delete, Add, Search },
    data(){
        return {
            obj: {},
            lists: [],
            headers: [
                { text: 'List',   value: 'listname', width:'3%', align:'center'},
                { text: 'List Items', value: 'gotoItems',  sortable: false, width: '5%', align:'center'},
                { text: 'Actions', value: 'actions',  sortable: false, width: '5%', align:'center'},
            ]
        }
    },
    async mounted() {
            this.getList();
    },
    methods: {
        async getList() {
            this.lists = [];
            const response = await this.axios.get('http://localhost:3000/listController/lists');
            for(let element of response.data){
                this.lists.push(element);
            }
        },
        async searchList (lists) {
            this.lists = [];
            for(let element of lists){
                this.lists.push(element);
            }
        },
        navToItems (id) {
            this.$router.push({ path: `/list/${id}/items` });
        }        
    }
}
</script>

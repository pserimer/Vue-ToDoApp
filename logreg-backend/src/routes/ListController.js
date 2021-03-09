const { default: fastify } = require('fastify');
const TokenInterceptor = require('./TokenInterceptor');
const ListServices = require ('../services/ListServices');
const { createListSchema, updateListSchema, deleteListSchema } = require('../schemas/ListSchema');
// Load dependency
var solr = require('solr-client');
// Create a client
var client = solr.createClient();

async function routes (fastify) {
    //Get user's todo-lists:
    fastify.get('/lists',  {
        preHandler: TokenInterceptor
    }, async (req,res) => { 
        const result = await ListServices.getAllLists({ user: req.user });
        res.send(result);
    })
    
    //Add new list to user's todo-lists:
    fastify.post('/lists', {
        schema: createListSchema,
        preHandler: TokenInterceptor
    }, async (req, res) => {
        const list = {
            listname: req.body.listname,
            userid: req.user.id
        }
        
        let newList = await ListServices.addList( {list: list} );
        res.send(newList);
    })

    //Delete a list: 
    fastify.delete('/lists/:listid', {
        schema: deleteListSchema,
        preHandler: TokenInterceptor
    }, async(req,res) => {
        await ListServices.deleteOneList({ listid: req.params.listid });
        res.send('ok');
    })

    //Update listname:
    fastify.patch('/lists/:listid/update', {
        schema: updateListSchema,
        preHandler: TokenInterceptor
    }, async (req, res) => {
        const result = await ListServices.userControl({ userid: req.user.id, listid: req.params.listid });

        if(result){
            await ListServices.updateList({ list: req.body, id: req.params.listid })
            res.send('ok');
        }
        
        res.send('no permission');
    })

    //Search list by listname:
    fastify.post('/lists/search', {
        preHandler: TokenInterceptor
    }, async (req,res) => {
        //var query = client.createQuery()
        //            .q({listname : req.body.query , userid : req.user.id});
        const result = ListServices.search({listname : req.body.query , userid : req.user.id});
        res.send(result);
    })
};

module.exports = routes;

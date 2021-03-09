const { default: fastify } = require('fastify');
const TokenInterceptor = require('./TokenInterceptor');
const ItemServices = require ('../services/ItemServices');
const ListServices = require ('../services/ListServices');
const {  createItemSchema, updateItemSchema, updateStatusSchema, deleteItemSchema } = require('../schemas/ItemSchema');
// Load dependency
var solr = require('solr-client');
// Create a client
var client = solr.createClient();

async function routes (fastify) {
    //selected list's items:
    fastify.get('/lists/:listid/items', {
        preHandler: TokenInterceptor
    },  async(req,res) => {
        const result = await ListServices.userControl({ userid: req.user.id, listid: req.params.listid });

        if(result){
            const items = await ItemServices.getAllItemsOfList({ param: req.params });
            res.send(items);
        }

        res.status(401).send('unauthorized');
    })

    //Add new item to selected list: 
    fastify.post('/lists/:listid/items', {
        schema: createItemSchema,
        preHandler: TokenInterceptor
    }, async(req,res) => {
        const result = await ListServices.userControl({ userid: req.user.id, listid: req.params.listid });

        if(result){
            const item = {
                itemname: req.body.itemname,
                listid: parseInt(req.params.listid),
                status: 'ongoing'
            };
            
            let newItem = await ItemServices.addItem({ item });
            res.send(newItem);
        }
    })

    //Delete a selected item from selected list:
    fastify.delete('/lists/:listid/items/:itemid', {
        schema: deleteItemSchema,
        preHandler: TokenInterceptor
    }, async(req, res) => {
        const result = await ListServices.userControl({ userid: req.user.id, listid: req.params.listid });

        if(result){
            await ItemServices.deleteItem({ param: req.params })
            res.send('ok');
        }

        res.status(401).send('unauthorized');
    })

    //Update itemname from selected list: 
    fastify.patch('/lists/:listid/items/:itemid/update', {
        schema: updateItemSchema,
        preHandler: TokenInterceptor
    }, async(req,res) => {
        const result = await ListServices.userControl({ userid: req.user.id, listid: req.params.listid });

        if(result){
            await ItemServices.updateItem({ item: req.body, id: req.params.itemid })
            res.send('ok');
        }

        res.status(401).send('unauthorized');
    })

    //Change status:
    fastify.patch('/lists/:listid/items/:itemid/status', {
        schema: updateStatusSchema,
        preHandler: TokenInterceptor
    }, async(req,res) => {
        const result = await ListServices.userControl({ userid: req.user.id, listid: req.params.listid });

        if(result){
            await ItemServices.changeStatus({ item: req.body, id: req.params.itemid });
            res.send('ok');
        }

        res.status(401).send('unauthorized');
    })
};

module.exports = routes;
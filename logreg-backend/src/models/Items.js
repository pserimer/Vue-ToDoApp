const knex = require('../utils/knex');
const { Model } =  require('objection');

Model.knex(knex);

class Items extends Model {
    static get tableName(){
        return 'items';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['itemname','listid'],
            properties: {
                id: {type: 'integer'},
                itemname: {type: 'string'},
                listid: {type: 'integer'},
                status: {type: 'string'}
            }
        };
    }
}

module.exports = Items;
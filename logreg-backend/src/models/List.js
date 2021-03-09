const knex = require('../utils/knex');
const { Model } =  require('objection');

Model.knex(knex);

class List extends Model {
    static get tableName(){
        return 'lists';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['listname','userid'],
            properties: {
                id: {type: 'integer'},
                listname: {type: 'string'},
                userid: {type: 'integer'}
            }
        };
    }
}

module.exports = List;
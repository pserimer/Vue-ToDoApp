const knex = require('../utils/knex');
const { Model } =  require('objection');

Model.knex(knex);

class User extends Model {
    static get tableName(){
        return 'users';
    }

    static get jsonSchema(){
        return {
            type: 'object',
            required: ['username','psswd'],
            properties: {
                id: {type: 'integer'},
                username: {type: 'string'},
                psswd: {type: 'string'}
            }
        };
    }
}

module.exports = User;
const userProperties = {
    id: {type: 'integer'},
    username: {type: 'string'},
    psswd: {type: 'string'}
};

const bodyCreateJsonSchema = {
    type: 'object',
    properties: userProperties,
    required: ['username', 'psswd']
};

const createUserSchema = {
    body: bodyCreateJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: userProperties
      }
    }
};
  
module.exports = {
  createUserSchema
};
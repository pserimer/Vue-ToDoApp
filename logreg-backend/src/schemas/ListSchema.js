const listProperties = {
    id: {type: 'integer'},
    listname: {type: 'string'},
    userid: {type: 'integer'}
};

const bodyCreateJsonSchema = {
    type: 'object',
    properties: listProperties,
    required: ['listname']
};

const paramsJsonSchema = {
    type: 'object',
    properties: {
      listid: { type: 'integer' }
    },
    required: ['listid']
};

const createListSchema = {
    body: bodyCreateJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: listProperties
      }
    }
};

const updateListSchema = {
    body: bodyCreateJsonSchema,
    params: paramsJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: listProperties
      }
    }
};

const deleteListSchema = {
    params: paramsJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: listProperties
      }
    }
  };

module.exports = {
    createListSchema,
    updateListSchema,
    deleteListSchema
};
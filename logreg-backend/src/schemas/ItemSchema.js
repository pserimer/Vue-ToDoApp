const itemProperties = {
    id: {type: 'integer'},
    itemname: {type: 'string'},
    listid: {type: 'integer'},
    status: {type: 'string'}
};

const bodyCreateJsonSchema = {
    type: 'object',
    properties: itemProperties,
    required: ['itemname']
};
/*
const paramsJsonSchema = {
  type: 'object',
  properties: {
    listid: { type: 'integer' }
  },
  required: ['listid']
};
*/
const paramsJsonSchema = {
    type: 'object',
    properties: {
      listid: { type: 'integer' },
      itemid: { type: 'integer'}
    },
    required: ['listid','itemid']
};

const createItemSchema = {
    //params: paramsJsonSchema,
    body: bodyCreateJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: itemProperties
      }
    }
};

const updateItemSchema = {
    params: paramsJsonSchema,
    body: bodyCreateJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: itemProperties
      }
    }
};

const updateStatusSchema = {
    params: paramsJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: itemProperties
      }
    }
};

const deleteItemSchema = {
    params: paramsJsonSchema,
    response: {
      200: {
        type: 'object',
        properties: itemProperties
      }
    }
  };

module.exports = {
    createItemSchema,
    updateItemSchema,
    updateStatusSchema,
    deleteItemSchema
};
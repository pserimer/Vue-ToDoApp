require('./utils/knex');

//Imports:
const fastify = require('fastify')();

//Routes:
fastify.register(require('./routes/UserController'), {prefix: '/userController'});
fastify.register(require('./routes/ListController'), {prefix: '/listController'});
fastify.register(require('./routes/ItemController'), {prefix: '/itemController'});

//CORS:
fastify.register(require('fastify-cors'), { 
    origin: 'http://localhost:8080'
})

//host binding: 0.0.0.0 => allows listening on all hosts
fastify.listen(3000, '0.0.0.0', function (err, address) {
    if (err) {
      fastify.log.error(err)
      //process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
  })
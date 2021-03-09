const { default: fastify } = require('fastify');
const UserServices = require('../services/UserServices');
const createUserSchema = require('../schemas/UserSchema');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function routes (fastify) {
    //login endpoint: 
    fastify.post('/login', {
        schema: createUserSchema
    }, async (req,res) => { 
        //Find user from database:
        let result = await UserServices.findUser({ user: req.body });
        //User is found, check access token:
        const match = bcrypt.compareSync(req.body.psswd, result.psswd);
        if(match) {
            //Successfull login:
            const accessToken = jwt.sign({ username: result.username }, process.env.JSON_SECRET);
            res.send(accessToken);
        }
        
        //Access token failure:
        res.status(401).send('unauthorized');
    })

    //register endpoint:
    fastify.post('/register', {
        schema: createUserSchema
    }, async function (req,res) {
        //Find user from database:
        let result = await UserServices.findUser({ user: req.body, throwError: false });
        
        //Username is available, user can register:
        if(result == null) {
            const user = {
                username: req.body.username,
                psswd: bcrypt.hashSync(req.body.psswd, saltRounds)
            };
            
           const newUser = await UserServices.addUser({ user: user });
           res.send(newUser);
        }
                
        //Username is taken, cannot register:
        res.send('username is taken');   
    })
};

module.exports = routes;

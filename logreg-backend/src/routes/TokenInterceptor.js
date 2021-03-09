const jwt = require ('jsonwebtoken');
const UserServices = require('../services/UserServices');

module.exports =  async (req, res, done) => {
    let token = req.headers.authorization.replace('Bearer ', '');
    if(!token) 
    {
        res.status(401).send('token is null');
        //done (err);
    } 
    try {
        const verified = jwt.verify(token, process.env.JSON_SECRET);
        req.user = await UserServices.findUser({ user: verified });
        //done();
    } catch (err) {
        res.status(400).send('Invalid token');   
        return err;
    }
}
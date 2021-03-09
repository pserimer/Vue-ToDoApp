const User = require('../models/User');

class UserServices {
    static async findUser ({ user = {}, throwError = true }) {
        const result = await User.query().findOne({username: user.username});
        
        if(!result) {
            if(throwError){
                const err = new Error();
                err.statusCode = 404;
                err.message = 'user is not found';
                throw err;
            }
            return null;
        }
        return result;
    };

    static async addUser ({ user = {} }) {
        return await User.query().insert(user);
    };
}

module.exports = UserServices;

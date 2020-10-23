let userModel = require('../models/user');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.userRegistration = async (userObj) => {
    try {
        let user = await userModel.createUser(userObj);
        return true;
    } catch (error) {
        throw error;
    }
}

module.exports.userLogin = async (user) => {
    try {
        let storedUser = await userModel.findUser(user.email);
        if (storedUser) {
            if (bcrypt.compareSync(user.password, storedUser.password)) {
                let customUser = storedUser;
                delete customUser.password;
                let token = jwt.sign({ "user": customUser }, process.env.secretKey);
                return { "checkLogin": false, "message": "user logined successfully", "token": token };
            }
            else {
                return { "checkLogin": false, "message": "user password not matchs" };
            }
        }
        else {
            return { "checkLogin": false, "message": "user not found" };
        }
    } catch (error) {
        throw error;
    }

}



let userModel = require("../models/user");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userRegistration = async (userObj) => {
        await userModel.createUser(userObj);
        return true;
};

module.exports.userLogin = async (user) => {
        let storedUser = await userModel.findUser(user.email);
        /*
        let customUser= storedUser;
         delete customUser.password;
         delete customUser.devices;
        */
        let customUser = {
            "_id": storedUser._id,
            "fullName": storedUser.fullName,
            "email": storedUser.email,
            "age": storedUser.age,
            "phoneNumber": storedUser.phoneNumber,
            "address": storedUser.address,
            "createdAt": storedUser.createdAt,
        };
         
        if (storedUser) {
            if (bcrypt.compareSync(user.password, storedUser.password)) {
                let token = jwt.sign({ "user": customUser }, process.env.secretKey);
                return { "checkLogin": true, "message": "user logined successfully","user":customUser, "token": token };
            }
            else {
                return { "checkLogin": false, "message": "user password not matchs" };
            }
        }
        else {
            return { "checkLogin": false, "message": "user not found" };
        }
};



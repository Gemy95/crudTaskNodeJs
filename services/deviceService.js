let deviceModel = require('../models/device');
let userModel = require('../models/user');
let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.createDevice = async (deviceObj,user) => {
    try {
        let device = await deviceModel.createDevice(deviceObj);
        let addDeviceToUser = await userModel.addDeviceByUser(user._id,device._id); 
        return true;
    } catch (error) {
        console.log("error device service creation" + error)
        throw error;
    }
}

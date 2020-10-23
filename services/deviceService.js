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
        throw error;
    }
}

module.exports.getUserDevices = async (userId) => {
    try {
        let userDevices = await deviceModel.getUserDevices(userId);
        return userDevices;
    } catch (error) {
        throw error;
    }
}

module.exports.getUserDeviceData = async (userId,deviceId) => {
    try {
        let userDeviceData = await deviceModel.getUserDeviceData(userId,deviceId);
        return userDeviceData;
    } catch (error) {
        throw error;
    }
}


module.exports.getDeviceData = async (deviceId) => {
    try {
        let deviceData = await deviceModel.getDeviceData(deviceId);
        return deviceData;
    } catch (error) {
        throw error;
    }
}



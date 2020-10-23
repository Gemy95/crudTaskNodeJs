let deviceModel = require("../models/device");
let userModel = require("../models/user");
require("dotenv").config();

module.exports.createDevice = async (deviceObj, user) => {
        let device = await deviceModel.createDevice(deviceObj);
        await userModel.addDeviceByUser(user._id, device._id);
        return true;
};

module.exports.addDevice = async (deviceObj, user) => {
        let device = await deviceModel.createDevice(deviceObj);
        await userModel.addDeviceByUser(user._id, device._id);
        return true;
};

module.exports.updateDevice = async (body) => {
        let userArrayDevices = (await userModel.findUserArrayDevices(body.userId)).devices || [];
        let deviceId = body.deviceId.toString();
        let updatedDevice = body;
        delete updatedDevice.userId;
        delete updatedDevice.deviceId;

        if ( userArrayDevices!=undefined && Array.isArray(userArrayDevices) && userArrayDevices.includes(`${deviceId}`)) {
                await deviceModel.updateDevice(deviceId,updatedDevice);
                return true;
        } else {
                return false;
        }
};


module.exports.getUserDevices = async (userId) => {
        let userDevices = await deviceModel.getUserDevices(userId);
        return userDevices;
};

module.exports.getUserDeviceData = async (userId, deviceId) => {
        let userDeviceData = await deviceModel.getUserDeviceData(userId, deviceId);
        return userDeviceData;
};


module.exports.getDeviceData = async (deviceId) => {
        let deviceData = await deviceModel.getDeviceData(deviceId);
        return deviceData;
};




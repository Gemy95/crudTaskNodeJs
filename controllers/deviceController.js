const { validationResult } = require("express-validator");
let deviceService = require("../services/deviceService");

module.exports.createDevice = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

         await deviceService.createDevice(req.body,req.user);
        return res.status(200).json({ "message": "device created successfully" });

    } catch (error) {
        res.status(400).json({
            "message": `device created failed, ${error.message}`
        });
    }
};

module.exports.addDevice = async (req, res) => {
    try {
        
        await deviceService.createDevice({},req.user);
        return res.status(200).json({ "message": "device added successfully" });

    } catch (error) {
        res.status(400).json({
            "message": `device added failed, ${error.message}`
        });
    }
};

module.exports.updateDevice = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });
         let result= await deviceService.updateDevice(req.body);
         if(result){
            return res.status(200).json({ "message": "device updated successfully" });
         }
         else{
            res.status(400).json({
                "message": "device updated failed, not allowed this user update device"
            });
         }
    } catch (error) {
        res.status(400).json({
            "message": `device updated failed, ${error.message}`
        });
    }
};

module.exports.getUserDevices = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

        let result = await deviceService.getUserDevices(req.query.userId);
        return res.status(200).json({ "message": "user devices data retrieved successfuly", "data":result });

    } catch (error) {
        res.status(400).json({
            "message": `get user devices failed, ${error.message}`
        });
    }
};


module.exports.getUserDeviceData = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

        let result = await deviceService.getUserDeviceData(req.query.userId,req.query.deviceId);
        return res.status(200).json({ "message": "user device data retrieved successfuly", "data":result });

    } catch (error) {
        res.status(400).json({
            "message": `get user device data failed, ${error.message}`
        });
    }
};


module.exports.getDeviceData = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

        let result = await deviceService.getDeviceData(req.query.deviceId);
        return res.status(200).json({ "message": "user device data retrieved successfuly", "data":result });

    } catch (error) {
        res.status(400).json({
            "message": `get device data failed, ${error.message}`
        });
    }
};


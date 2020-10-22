const { body, validationResult } = require('express-validator');
let deviceService = require('../services/deviceService');

module.exports.createDevice = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

        let result = await deviceService.createDevice(req.body,req.user);
        return res.status(200).json({ "message": "device created successfully" });

    } catch (error) {
        res.status(400).json({
            "message": `device created failed, ${error.message}`
        });
    }
}

const { body, validationResult } = require('express-validator');
let userService = require('../services/userService');

module.exports.userRegistration = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

        let result = await userService.userRegistration(req.body);
        return res.status(200).json({ "message": "user created successfully" });

    } catch (error) {
        res.status(400).json({
            "message": `user created failed, ${error.message}`
        });
    }
}


module.exports.userLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            //return res.status(400).json({ "msessage": errors.array()[0].msg });
            return res.status(400).json({ "msessage": errors.array() });

        let result = await userService.userLogin(req.body);

        if (result.checkLogin)
            return res.status(200).json({ "message": result.message, "user": result.user, "token": result.token });
        else
            res.status(400).json({ "message": `user login failed, ${result.message}` });

    } catch (error) {
        res.status(400).json({
            "message": `user login failed, ${error.message}`
        });
    }
}



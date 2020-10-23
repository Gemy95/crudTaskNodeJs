const { query, body } = require("express-validator");
let userModel= require('../models/user');

module.exports.validateRegisterUser = () => {
  return  [
        body('fullName').not().isEmpty().withMessage(`required fullName`),
        body('password').isLength({ min: 5 }).withMessage(`invalid minimum password length 5 letter `).not().isEmpty().withMessage(`invalid password`),
        body('age').not().isEmpty().withMessage(`invalid age`),
        body('phoneNumber').not().isEmpty().withMessage(`required phoneNumber`),
        body('address').not().isEmpty().withMessage(`required address`),
        body('email').isEmail().withMessage(`required email`).not().isEmpty().withMessage(`invalid email`)
        .custom(value => {
                return userModel.findOne({ "email": value })
                    .then(user => {
                        if (user) {
                            return Promise.reject('email found');
                        } 
                    })
            })
      ]
}

module.exports.validateLoginUser = ()=>{
  return  [
        body('email').isEmail().withMessage(`required email`).not().isEmpty().withMessage(`invalid email`),
        body('password').isLength({ min: 5 }).withMessage(`invalid minimum password length 5 letter `).not().isEmpty().withMessage(`invalid password`),
      ]
}

module.exports.validateUserId = ()=>{
  return  [
    query('userId').not().isEmpty().withMessage(`required userId`).isString().withMessage(`userId must be string`)
      ]
}




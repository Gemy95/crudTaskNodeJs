const express = require('express');
const router = express.Router();
let userController= require('../controllers/userController');
let userValidation= require('../helpers/userValidation');


/**
 * @typedef UserRegister
 * @property {string} fullName.required
 * @property {string} password.required - 
 * @property {string} email.required
 * @property {number} age.required - 
 * @property {string} phoneNumber.required
 * @property {string} address.required -
 */

/**
 * @route Post /api/users/userRegistration
 * @group crud - Operations about user
 * @param {UserRegister.model} body.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/userRegistration',userValidation.validateRegisterUser(), userController.userRegistration);


/**
 * @typedef UserLogin
 * @property {string} email.required
 * @property {string} password.required 
 */

/**
 * @route Post /api/users/userLogin
 * @group crud - Operations about user
 * @param {UserLogin.model} body.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/userLogin',userValidation.validateLoginUser(), userController.userLogin);



module.exports = router;

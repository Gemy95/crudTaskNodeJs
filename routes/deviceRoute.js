const express = require('express');
const router = express.Router();
let deviceController= require('../controllers/deviceController');
let deviceValidation= require('../helpers/deviceValidation');
let userValidation= require('../helpers/userValidation');
let authMiddleware= require('../middlewares/authMiddleware'); 

/**
 * @typedef createDevice
 * @property {string} deviceName.required -
 * @property {string} categoryName.required - 
 * @property {string} color.required -
 * @property {string} barcode.required - 
 * @property {number} price.required
 * @property {number} quantity.required -
 * @property {number} weight.required -
 */

/**
 * @route Post /api/devices/createDevice
 * @group crud - Operations about user
 * @security JWT
 * @param {createDevice.model} body.body.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/createDevice',authMiddleware,deviceValidation.validateCreateDevice(), deviceController.createDevice);


/**
 * @route Post /api/devices/getUserDevices
 * @group crud - Operations about user
 * @security JWT
 * @param {string} userId.query.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/getUserDevices',authMiddleware,userValidation.validateUserId(), deviceController.getUserDevices);


/**
 * @route Post /api/devices/getUserDeviceData
 * @group crud - Operations about user
 * @security JWT
 * @param {string} userId.query.required 
 * @param {string} deviceId.query.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/getUserDeviceData',authMiddleware,userValidation.validateUserId(),deviceValidation.validateDeviceId(), deviceController.getUserDeviceData);


/**
 * @route Post /api/devices/getDeviceData
 * @group crud - Operations about user
 * @security JWT
 * @param {string} deviceId.query.required 
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */
router.post('/getDeviceData',authMiddleware,deviceValidation.validateDeviceId(), deviceController.getDeviceData);



module.exports = router;
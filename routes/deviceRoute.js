const express = require('express');
const router = express.Router();
let deviceController= require('../controllers/deviceController');
let deviceValidation= require('../helpers/deviceValidation');
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

module.exports = router;

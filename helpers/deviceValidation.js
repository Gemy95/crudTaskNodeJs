const { query, body } = require("express-validator");

module.exports.validateCreateDevice = ()=>{
    return  [
          body("deviceName").not().isEmpty().withMessage("required deviceName").isString().withMessage("device Name not string"),
          body("categoryName").not().isEmpty().withMessage("required categoryName").isString().withMessage("category Name not string"),
          body("color").not().isEmpty().withMessage("required color").isString().withMessage("color not string"),
          body("barcode").not().isEmpty().withMessage("required barcode").isString().withMessage("barcode not string"),
          body("price").not().isEmpty().withMessage("required price").isNumeric().withMessage("price not number"),
          body("quantity").not().isEmpty().withMessage("required quantity").isNumeric().withMessage("quantity not number"),
          body("weight").not().isEmpty().withMessage("required weight").isNumeric().withMessage("weight not number")
        ];
  };

  module.exports.validateDeviceId = ()=>{
      return  [query("deviceId").not().isEmpty().withMessage("required deviceId").isString().withMessage("deviceId must be string")];
    };
    
  module.exports.validateDeviceIdBody = ()=>{
      return  [body("deviceId").not().isEmpty().withMessage("required deviceId").isString().withMessage("deviceId must be string")];
    };
    
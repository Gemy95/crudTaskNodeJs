const mongoose = require("mongoose");
let colors= require('../enums/colors');

let deviceSchema = mongoose.Schema({
    deviceName: { type: String },
    categoryName:{ type: String },
    color: { type: String , emum: Object.values(colors)},
    barcode: { type: String },
    price: { type: Number},
    quantity: { type: Number},
    weight: { type: Number},
},{
    timestamps:true
});


deviceSchema.statics.createDevice = async (deviceObj) => {
    return new Promise((resolve, reject) => {
        deviceModel.create(deviceObj).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};

/*
userSchema.statics.findUser = async (userEmail) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({"email":userEmail}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};
*/



let deviceModel=mongoose.model("devices", deviceSchema);


module.exports = deviceModel;
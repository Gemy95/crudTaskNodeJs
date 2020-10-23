const mongoose = require("mongoose");
let colors= require("../enums/colors");

let deviceSchema = mongoose.Schema({
    deviceName: { type: String },
    categoryName:{ type: String },
    color: { type: String , emum: Object.values(colors)},
    barcode: { type: String },
    price: { type: Number},
    quantity: { type: Number},
    weight: { type: Number},
},{
    timestamps:true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        }
    }
});


deviceSchema.statics.createDevice = async (deviceObj) => {
    return new Promise((resolve, reject) => {
        deviceModel.create(deviceObj).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};

deviceSchema.statics.updateDevice = async (deviceId,deviceObj) => {
    return new Promise((resolve, reject) => {
        deviceModel.updateOne({"_id":deviceId},deviceObj).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};



deviceSchema.statics.getUserDevices = async (userId) => {
    return new Promise((resolve, reject) => {
        deviceModel.find({}).populate(userId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


deviceSchema.statics.getUserDeviceData = async (userId,deviceId) => {
    return new Promise((resolve, reject) => {
        deviceModel.findOne({"_id":deviceId}).populate(userId).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};



deviceSchema.statics.getDeviceData = async (deviceId) => {
    return new Promise((resolve, reject) => {
        deviceModel.findOne({"_id":deviceId}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


let deviceModel=mongoose.model("devices", deviceSchema);


module.exports = deviceModel;
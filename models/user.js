const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema({
    fullName: { type: String },
    email: { type: String},
    password: { type: String },
    age: { type: Number},
    phoneNumber: { type: String},
    address: { type: String},
    devices:[{type:mongoose.Schema.Types.ObjectId,ref:"devices"}]
},{
    timestamps:true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
        }
    }
});


userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});



userSchema.statics.createUser = async (userObj) => {
    return new Promise((resolve, reject) => {
        userModel.create(userObj).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


userSchema.statics.findUser = async (userEmail) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({"email":userEmail}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


userSchema.statics.addDeviceByUser = async (userId,deviceId) => {
    return new Promise((resolve, reject) => {
        userModel.updateOne({"_id":userId},{ $push:{devices: deviceId }}).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};


userSchema.statics.findUserArrayDevices = async (userId) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({"_id":userId},["devices"]).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
};




let userModel=mongoose.model("users", userSchema);


module.exports = userModel;
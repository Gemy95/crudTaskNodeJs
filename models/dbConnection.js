const mongoose = require("mongoose");

const createConnection= async () => {
    try {
        let connection = await mongoose.connect("mongodb://localhost/taskDB", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
        console.log("db established successfully");
        return connection;
    }
    catch (error) {
        console.log("db error="+ error);
        throw error;
    }
};

module.exports = createConnection;
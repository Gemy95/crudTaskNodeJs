const mongoose = require("mongoose");

async function createConnection() {
    try {
        let connection = await mongoose.connect('mongodb://localhost/taskDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
        console.log("db established successfully");
        return connection;
    }
    catch (err) {
        console.log("db error="+err)
        return err;
    }
}

module.exports = createConnection;
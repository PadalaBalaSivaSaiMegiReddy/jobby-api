const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_LOCAL_URL).then((conn)=>{
        console.log(`Database connected successfully connected with host ${conn.connection.host}`);
    }).catch((err)=>{
        console.log("Error connecting to the database",err);
    })
}

module.exports = connectDatabase;
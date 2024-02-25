require('dotenv').config();
const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const connectionString = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`;

function connectDB(){
    mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useUnifiedTopology: true
         })
    const connection = mongoose.connection
    connection.on('connected',()=>{
        console.log('MongoDb connection successfull')
    })
    connection.on('error',()=>{
        console.log('Error')
    })
}
connectDB()
module.exports = mongoose
const mongoose=require('mongoose');
require('dotenv').config();
// const mongoUrl='mongodb://127.0.0.1:27017/rajat';    //local db
const mongoUrl=process.env.DB_URL;    //hosted db
mongoose.connect(mongoUrl);

const db=mongoose.connection;

// evnt listeners

db.on('connected',()=>{
  console.log("Connected Successfully");
});

db.on('error',(err)=>{
  console.log("connection error"+err);
});

db.on('disconnected',()=>{
  console.log("disconnected");
});

// export database bconnection

module.exports=db;
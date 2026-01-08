const express= require ("express");
const db=require('./db');
require('dotenv').config();
const person=require('./models/Person');
const bodyParser=require('body-parser');

const passport= require('passport');
// passport local is username -password based authentication also called local strategy 
const LocalPassport=require('passport-local').Strategy;
 
const app=express();

// middleware functions

const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] requets send to :${req.originalUrl}`);
  next();  //it indicates working of current middleware is done. tranfer to next routes or next middleware
}

app.use(logRequest);

// passport authentication
passport.use(new LocalPassport( async (userN,pass,done)=>{
 try{
   console.log('credential: ',userN,pass);
    const user=await person.findOne({email:userN});
    if(!user)
      done(null,false,{message: 'inalid usename'});
    const isMatch=user.password===pass?true:false;
    if(isMatch){
      done(null,user);
    }
    else done(null,false,{message:'incorrect user'});
 }
 catch(err){
  return done(err);
 }
}));

app.use(passport.initialize());



// middleware
app.use(bodyParser.json());  //req.body
app.get('/',passport.authenticate('local',{session:false}),(req,res)=>{
  res.send("welcome to the home page")
});
app.get('/idli',(req,res)=>{
  const customised={
    name:"rava idli",
    size:"10cm"
  }
  res.send(customised);
})
//complex method for post
// app.post('/person',(req,res)=>{
//   const data=req.body;  //body parser
//   const newPerson= new person(data);
//   newPerson.save((error,savedPerson)=>{
//     if(error){
//       console.log("error"+error);
//       res.status(500).json(error);
//     }
//     else{
//       console.log("data svaed Successfully");
//       res.status(200).json(savedPerson);
//     }
//   });
// })

const personRoutes=require('./routes/personRoutes');

//middleware
app.use('/',personRoutes);


const port=process.env.PORT ||3000;
app.listen(port,()=>{
  console.log("server running on 3000");
})
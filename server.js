const express= require ("express");
const db=require('./db');
const person=require('./models/Person');
const bodyParser=require('body-parser');

const app=express();

// middleware
app.use(bodyParser.json());  //req.body
app.get('/',(req,res)=>{
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

app.listen(3000,()=>{
  console.log("server running on 3000");
})
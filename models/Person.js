const mongoose=require('mongoose');

// creting bluprint(schema)


const personSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  work:{
    type:String,
    enum:['chef','manager','waiter','owner'],
    required:true
  }
});

// creating model
const person=mongoose.model('person',personSchema);
module.exports=person;
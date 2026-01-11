const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
  },
  username:{
    type:String,
    requred:true
  },
  password:{
    type:String,
    required:true
  }

});

// password in plaintext is not safe. password must be stored in hashed using bcrypt and plus salt(extra string added in hashed password)

// using pre middleware to hashed the password before storing it

personSchema.pre('save', async function(){
  const person=this;
  // only hashing done for new user and update in password only
  if(!person.isModified('password')) return 
  try{
    // salt generation
    const salt=await bcrypt.genSalt(10);  //as much large number => more security but make processing more complex and slow
    const hashedPassword=await bcrypt.hash(person.password,salt);

    //changed the plain password with hashed password
    person.password=hashedPassword;
  }
  catch(err){
    throw err;
  }
});

// how password is compare
// hashed password-> extract salt
// entered password+ salt -> hashed password(inputed)
// compare both hashed password and input hashed password


personSchema.methods.comparePassword=async function(enteredPassword){
  try{
    const isMatch=await bcrypt.compare(enteredPassword,this.password);
    return isMatch;
  }
  catch(err){
    throw err;
  }
}


// creating model
const person=mongoose.model('person',personSchema);
module.exports=person;
const express=require('express')
const router=express.Router();
const person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

// use of express router

// use of async and await  with the use of try and catch
router.post('/signup',async(req,res)=>{
  try{ 
    const data=req.body;
    const newPerson=new person(data);

    const response= await newPerson.save();
    console.log("data saved");

    const payload={
      id:response.id,
      username:response.username
    }

    const token=generateToken(payload,process.env.JWT_SECRET);

    res.status(200).json({response:response,
      token:token
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'server error'});
  }
});


// login using token
router.post('/login',async(req,res)=>{
  try{
    const {username,password}=req.body;
    const user=await person.findOne({username:username});
    if(!user || !await(user.comparePassword(password))){
      return res.status(401).json({error:"invalid username or password"});
    }

    const payload={
      id:user.id,
      username:user.username
    }
    const token=generateToken(payload);
    res.json({token});

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'server error'});
  }
})

// get all data

router.get('/show',jwtAuthMiddleware,async (req,res)=>{
  try{
    const data=await person.find();
    res.status(200).json(data);
  }
  catch(err){
    res.status(500).json({error: "server error"});
  }
});

//parameterised api. get only those data based on field
router.get('/show/:workType', async(req,res)=>{
  try{
    const workType=req.params.workType;
    if(workType=='chef' || workType=='manager' || workType=='waiter' || workType=='owner'){
      const response=await person.find({work:workType});
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:"invalid work type"});
    }
  }
  catch(err){
    res.status(500).json({error: "server error"});
  }
})


// to update the data

router.put('/update/:id',async (req,res)=>{
  try{
    const personId= req.params.id;
    const updateData=req.body;

    const response=await person.findByIdAndUpdate(personId,updateData,{
      new:true,
      runValidators:true
    });

    if(!response){
      res.status(404).json({error:"person not found"})
    }

    res.status(200).json(response);
  }
  catch(err){
    res.status(500).json({error: "server error"});
  }


});


// delete the data

router.delete('/remove/:id',async (req,res)=>{
  try{
    const personId=req.params.id;
    const response=await person.findByIdAndDelete(personId);
    if(!response){
      res.status(404).json({error:"person not found"});
    }
    res.status(200).json({message:"person deleted successfully"});
  }
  catch(err){
    res.status(500).json({error: "server error"});
  }
})

// adding comment to track git 

module.exports=router;
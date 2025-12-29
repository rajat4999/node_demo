const express=require('express')
const router=express.Router();
const person=require('./../models/Person');

// use of express router

// use of async and await  with the use of try and catch
router.post('/person',async(req,res)=>{
  try{ 
    const data=req.body;
    const newPerson=new person(data);

    const response= await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'server error'});
  }
});

// get all data

router.get('/show',async (req,res)=>{
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
module.exports=router;
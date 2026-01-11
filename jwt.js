const jwt=require('jsonwebtoken')


// middleware to verify token
const jwtAuthMiddleware=(req,res,next)=>{
  const authorizationHeader=req.headers.authorization;
  if(!authorizationHeader) return res.status(404).json({error:"token not found"});
  // extract the token from request header
  const token=req.headers.authorization.split(' ')[1];
  if(!token)  return res.status(401).json({error:"unauthorised"});

  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);  //return decoded payload
    req.user=decoded;
    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({error:"invalid token"});
  }
}


// function to generate token
const generateToken=(userData)=>{
  // generate token from userdata
  return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken};
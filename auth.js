const passport=require('passport');
const person=require('./models/Person');
// passport local is username -password based authentication also called local strategy 
const localPassport=require('passport-local').Strategy;
passport.use(new localPassport( async (username,password,done)=>{
  try{
    const user=await person.findOne({username:username});
    if(!user){
      return done(null,false,{message:'invalid user'});
    }
    const isMatch=user.comparePassword(password);
    if(!isMatch){
      return done(null,false,{message:'incorrect password'});
    }
    else{
      return done(null, user);
    }
  }
  catch(err){
    return done(err);
  }
}));

module.exports=passport;
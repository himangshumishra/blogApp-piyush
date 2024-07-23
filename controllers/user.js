const User = require("../models/user");


function handleSigninPage(req,res){
return res.render('signin')
}
function handleSignupPage(req,res){
return res.render('signup')
}

async function handleSignup(req,res){
const {name,email,password}=req.body;
try {
  await User.create({
      name,
      email,
      password,
  })
  return res.redirect('/')
} catch (error) {
    return res.render('signup',{error:error.message})
  
}

}

async function handleSignin(req,res){
    const {email,password}=req.body;
    // console.log(req.body);
  try {
     const token=await User.matchPasswordAndGenerateToken(email,password);
  // console.log("Token is",token);
  res.cookie('token',token);
  return res.redirect('/')
  } catch (error) {
    return res.render('signin',{error:error.message})
    
  }
}


function handleSignout(req,res){
    res.clearCookie('token')
    return res.redirect('/')
}

module.exports={
    handleSigninPage,handleSignupPage,handleSignup,handleSignin,handleSignout}
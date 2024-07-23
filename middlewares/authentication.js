const { validateToken } = require("../services/authentication");

function checkAuth(cookie){
    return (req,res,next)=>{
        const tokenCookie=req.cookies[cookie];
        if(!cookie) return next();

       try {
         const userPayload=validateToken(tokenCookie)
         req.user=userPayload;
    next()
       } catch (error) {
           next() 
       }
    }
}

module.exports={
    checkAuth
}
const Router = require('express');
const { handleSigninPage, handleSignupPage, handleSignup, handleSignin, handleSignout } = require('../controllers/user');

 const router=Router();

 router.route('/signin')
 .get(handleSigninPage)
 .post(handleSignin);

router.route('/signup')
 .get(handleSignupPage)
 .post(handleSignup);

router.get('/logout', handleSignout);

 module.exports=router;
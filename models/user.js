const {createHmac,randomBytes}=require('crypto');
const {Schema, model} = require('mongoose');
const { createToken } = require('../services/authentication');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:'/images/avatar.jpeg'
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    },

    
},
{timestamps:true});

userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')) return;
    const salt=randomBytes(32).toString('hex');
    const hash=createHmac('sha256',salt).update(user.password).digest('hex');
    this.salt=salt;
    this.password=hash;
    next();

})

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user=await this.findOne({email});
    if(!user)  throw new Error("User not found");
    const salt=user.salt;

    const hashedPassword=user.password;
    const userProvidedHash=createHmac("sha256",salt)
    .update(password).digest("hex")
    if(hashedPassword!==userProvidedHash) throw new Error("Password is incorrect");
    const token=createToken(user);
    return token;
})

const User=model('user',userSchema);
module.exports=User;
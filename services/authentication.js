const JWT=require('jsonwebtoken')

const secret="#rdfgh4t%g43$b"

function createToken(user){
    const payload={
        _id:user.id,
        name:user.name,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    };
    const token =JWT.sign(payload, secret)
    return token;
}

function validateToken(token){
    const payload= JWT.verify(token,secret);
    return payload;
}

module.exports={
    createToken,validateToken,
}
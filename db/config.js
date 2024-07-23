const { default: mongoose } = require("mongoose");

async function connectDb(url){
    mongoose.connect(url).then(()=>console.log("Mongodb connected successfully")).catch((error)=>console.log(error))
}

module.exports={
    connectDb
}
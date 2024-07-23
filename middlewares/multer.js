const multer=require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Math.floor(Math.random() * 1000)}-${file.originalname}`);
    }
  })
  
 const upload = multer({ 
    storage,
})

module.exports=upload;
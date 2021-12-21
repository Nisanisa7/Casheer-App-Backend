const multer = require('multer')
const helpers = require('../helpers/helpers')
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+ uuidv4() + '-' +file.originalname)
    }
  })

const upload = multer({
  storage : storage,
  limits :{
      fileSize : 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) =>{
    if ( file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
           cb(null, true)
         } 
    else{
          cb({
            success: false,
            message: 'Invalid file type. only png, jpg, and jpeg format allowed'
          }, false)
         }
  
  },

})

module.exports = upload
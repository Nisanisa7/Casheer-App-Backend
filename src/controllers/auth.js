const AuthModel = require('../models/auth')
const jwt = require('jsonwebtoken')
const {v4 : uuidv4} = require('uuid')
const bcrypt = require('bcryptjs');
const helpers = require('../helpers/helpers')

const login = async (req, res, next) =>{
    const {email, password} = req.body
    const result = await AuthModel.findUser(email)
    const user = result[0]
    console.log(user.password);
    if(email == '' || password == ''){
        helpers.response(res, null, 500, {message:'Email or Password can not be empty'})
    }
    else if(result < 1){
        helpers.response(res, null, 500, {message:"We couldn't find an account that matched the one you entered. please try again"})
    }
    bcrypt.compare(password, user.password, function(err, resCompare) {
        if(!resCompare){
            return helpers.response(res, null, 401, {message: 'password wrong'})
        }
        jwt.sign({ email: user.email, idUser: user.idUser, },
            process.env.SECRET_KEY, { expiresIn: "24h" },
            function(err, token) {
                console.log(token);
                console.log(process.env.SECRET_KEY);
                delete user.password;
                user.token = token;
                helpers.response(res, user, 200)
            }
        );
    })
}
const Register = async(req, res, next) =>{
    const {name, email, password} = req.body
    const kasir = await AuthModel.findUser(email)
    if(kasir.length > 0){
        return helpers.response(res, null, 401, {message:"This email address is already being used"})
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password , salt, function(err, hash) {
  
        const data = {
            idUser: uuidv4(),
            name : name,
            email : email,
            password : hash,
            status : 'active',
            role: 'Kasir'
        }
        AuthModel.register(data)
        .then((result)=>{
            delete data.password
            jwt.sign({email: data.email, name : data.name},
                process.env.SECRET_KEY, function(err, token){
                    //this is for email actiovation
                })
                helpers.response(res, data , 200, {message: "registered success! check your email for activation "})
        })
        .catch((error)=>{
            console.log(error);
            helpers.response(res, null, 500, {message: 'internal server error'})
        })
    });
});
}
const RegisterAdmin = async(req, res, next) =>{
    const {name, email, password} = req.body
    const kasir = await AuthModel.findUser(email)
    if(kasir.length > 0){
        return helpers.response(res, null, 401, {message:"This email address is already being used"})
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password , salt, function(err, hash) {
  
        const data = {
            idUser: uuidv4(),
            name : name,
            email : email,
            password : hash,
            status : 'active',
            role: 'Admin'
        }
        AuthModel.register(data)
        .then((result)=>{
            delete data.password
            jwt.sign({email: data.email, name : data.name},
                process.env.SECRET_KEY, function(err, token){
                    //this is for email actiovation
                })
                helpers.response(res, data , 200, {message: "registered success! check your email for activation "})
        })
        .catch((error)=>{
            console.log(error);
            helpers.response(res, null, 500, {message: 'internal server error'})
        })
    });
});
}

module.exports = {
    login, 
    Register,
    RegisterAdmin
}
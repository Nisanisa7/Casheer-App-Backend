const connection = require('../configs/db')
const findUser = (email)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM user where email = ?', email, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const register = (data) =>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT into user SET ?', data, (error, result)=>{

            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const registerAdmin = (data) =>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT into user SET ?', data, (error, result)=>{

            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
module.exports = {
    findUser,
    register,
    registerAdmin
}
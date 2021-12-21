const connection = require('../configs/db')

const getOrder = (search, sortBy, sort,offset, limit)=>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM orderfood') 
        connection.query(`SELECT * FROM orderfood INNER JOIN user on orderfood.iduser = user.iduser WHERE orderfood.invoice LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ?`,[search, offset, limit], (error, result)=>{
            if(!error){
                resolve(result)
            }
            else{
                reject(error)
            }
        })
    })
}
const getByUser = (iduser) =>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM orderfood WHERE iduser =  ?`, iduser, (error, result)=>{
            if(!error){
                resolve(result)
            }
            else{
                reject(error)
            }
        })
    })
}
const insertOrder = (data) =>{
    return new Promise((resolve, reject)=>{
        connection.query(`INSERT INTO orderfood SET ?`, data, (error, result)=>{
            if(!error){
                resolve(result)
            }
            else{
                reject(error)
            }
        })
    })
}
module.exports ={
    getOrder,
    insertOrder,
    getByUser
}
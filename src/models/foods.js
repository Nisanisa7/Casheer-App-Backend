const connection = require('../configs/db')

const getFood = (search, sortBy, sort,offset, limit)=>{
    return new Promise((resolve, reject)=>{
        const queryCount = ('SELECT count(*) as numRows FROM food') 
        connection.query(`SELECT * FROM food INNER JOIN category on food.idcategory = category.idcategory
       WHERE food.foodname LIKE CONCAT('%',?,'%') ORDER BY ${sortBy} ${sort} LIMIT ?, ? `, [search, offset, limit], (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}

const queryCount = () =>{
    return new Promise((resolve, reject)=>{
    connection.query(`SELECT count(*) as numRows FROM food`, (error, result)=>{
        if(!error){
            console.log(result);
            resolve(result)
        } else {
            console.log(error);
            reject(error)
        }
    })
})
}

const getCategory = ()=>{
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM category `, (error, result)=>{
            if (!error) {
                resolve(result)
            } else {
                reject(error)
            }
        })
    })
}
const getFoodById = (idfood)=>{
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * FROM food where idfood = ?', idfood, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}
const insertFood = (data) =>{
    return new Promise((resolve, reject)=>{
        connection.query('INSERT INTO food SET ?', data, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const deleteId = (idfood) =>{
    return new Promise((resolve, reject)=>{
        connection.query('DELETE FROM food where idfood = ?', idfood, (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}

const updateFood = (idfood, data) =>{
    return new Promise((resolve, reject)=>{
        connection.query('UPDATE food SET ?  WHERE idfood = ?', [data, idfood], (error, result)=>{
            if(!error){
                resolve(result)
            } else{
                reject(error)
            }
        })
    })
}


module.exports = {
    getFood,
    insertFood,
    getCategory,
    queryCount,
    deleteId,
    getFoodById,
    updateFood
}
const orderModel = require('../models/orders')
const helpers = require("../helpers/helpers");
const { v4: uuidv4 } = require("uuid");


const getOrder = (req, res, next) => {
  const page = req.query.page || 1
  const search = req.query.search || ''
  const sortBy = req.query.sortBy || 'idorder'
  const sort = req.query.sort|| 'ASC'
  const limit = req.query.limit || 5
  const offset = (page-1) * limit
   orderModel.getOrder(search, sortBy, sort, offset, limit)
   .then((result)=>{
       helpers.response(res, result, 200, { message: 'success get data'})
   })
   .catch((err)=>{
    console.log(err);
    helpers.response(res, null, 500, { message: "internal server error" });
   })
}
const getOrderByUser = (req, res, next) => {
  const iduser = req.params.iduser
  orderModel.getByUser(iduser)
  .then((result)=>{
    helpers.response(res, result, 200, { message: 'success get data'})
  })
  .catch((err)=>{
    helpers.response(err, null, 200, { message:"internal server error"})
  })
}
const insertOrder = (req, res, next) => {
    const { foodName, name,totalprice,invoice, iduser} = req.body
   const data = {
       idorder : uuidv4(),
       foodName : foodName,
       name : name,
       totalprice : totalprice,
       invoice : invoice,
       iduser: iduser 
   }
   orderModel.insertOrder(data)
   .then(() => {
    helpers.response(res, data, 200, {
      message: "Data Successfully Inserted",
    });
  })
  .catch((err) => {
    console.log(err);
    helpers.response(res, null, 500, { message: "internal server error" });
  });
}



module.exports ={
    getOrder,
    getOrderByUser,
    insertOrder
}
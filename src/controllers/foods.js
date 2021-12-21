const foodModel = require("../models/foods");
const helpers = require("../helpers/helpers");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const { resume } = require("../configs/db");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.KEY,
  api_secret: process.env.SECRET,
});

const getFood = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const sortBy = req.query.sortBy || "idfood";
  const sort = req.query.sort || "ASC";
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;
  const totalPages = await foodModel.queryCount();
  foodModel
    .getFood(search, sortBy, sort, offset, limit)
    .then((result) => {
      const food = result;
      res.status(200);
      res.json({
        message: "success",
        totalpage: Math.ceil(totalPages[0].numRows / limit),
        limit: limit,
        currentpagenumber: page,
        currentpagesize: result.length,
        item: food,
      });
    })
    .catch((err) => {
      console.log(err);
      helpers.response(res, null, 500, { message: "internal server error" });
    });
};

const getFoodById = (req, res, next) => {
  const idfood = req.params.idfood
  foodModel.getFoodById(idfood)
  .then((result) => {
    helpers.response(res, result, 200, {
      message: "good job bucko",
    });
  })
  .catch((err) => {
    console.log(err);
    helpers.response(res, null, 500, { message: "internal server error" });
  });
};

const getCategory = (req, res, next) => {
  foodModel
    .getCategory()
    .then((result) => {
      helpers.response(res, result, 200, {
        message: "good job bucko",
      });
    })
    .catch((err) => {
      console.log(err);
      helpers.response(res, null, 500, { message: "internal server error" });
    });
};

const insertFood = async (req, res, next) => {
  try {
    const { foodname, qty, price, idcategory } = req.body;
    const { path } = req.file;
    const UploadResponse = await cloudinary.uploader.upload(path, {
      upload_preset: "kasirku",
    });
    const data = {
      idfood: uuidv4(),
      foodname: foodname,
      qty: qty,
      price: price,
      idcategory: idcategory,
      image: UploadResponse.secure_url,
      createdAt: new Date(),
    };
    foodModel
      .insertFood(data)
      .then(() => {
        helpers.response(res, data, 200, {
          message: "Data Successfully Inserted",
        });
      })
      .catch((err) => {
        console.log(err);
        helpers.response(res, null, 500, { message: "internal server error" });
      });
  } catch (error) {}
};

const updateFood = async (req, res, next) => {
  try {
    const idfood = req.params.idfood;
    const { foodname, qty, price } = req.body;
    const data = {
      foodname: foodname,
      qty: qty,
      price: price,
    };
    if (req.file) {
      const { path } = req.file;
      const UploadResponse = await cloudinary.uploader.upload(path, {
        upload_preset: "kasirku",
      });
      data.image = UploadResponse.secure_url;
    }
    foodModel
      .updateFood(idfood, data)
      .then((result) => {
        helpers.response(res, data, 200, {
          message: "Data Successfully Updated",
        });
      })
      .catch((error) => {
        console.log(error);
        helpers.response(res, null, 500, { message: "internal server error" });
      });
  } catch (error) {}
};

const deleteFood = (req, res, next) =>{
    const idfood = req.params.idfood
    foodModel.deleteId(idfood)
    .then((result)=>{
      helpers.response(res, result, 200, {
        message: "good job bucko",
      });
    })
    .catch((error)=>{
      helpers.response(res, error, 500, {
        message: "Internal Server error",
      });
    })
}


module.exports = {
  getFood,
  getFoodById,
  insertFood,
  getCategory,
  updateFood,
  deleteFood
};

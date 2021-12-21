const express = require('express')
const router = express.Router()
const foodController = require("../controllers/foods")
const upload = require("../middleware/multer")

router
    .get("/", foodController.getFood)
    .get("/category", foodController.getCategory)
    .get("/:idfood", foodController.getFoodById)
    .post("/", upload.single('image'), foodController.insertFood)
    .patch("/:idfood", upload.single('image'), foodController.updateFood)
    .delete("/:idfood", foodController.deleteFood)

    module.exports = router
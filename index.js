require("dotenv").config();
const express = require("express");
const app = express();
//its for declaring a route
const foodRouter = require("./src/routes/food");
const authRouter = require('./src/routes/auth')
const orderRouter = require('./src/routes/orders')
const bodyParser = require("body-parser");
const port = process.env.PORT;
const morgan = require("morgan");
const createError = require("http-errors");
const cors = require("cors");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//my middleware
const myMiddleware = (req, res, next) => {
    console.log('my middleware di jalankan ');
    next()
  }
  
  app.use(myMiddleware)
  app.use(cors())
  app.use('/food', foodRouter)
  app.use('/auth', authRouter)
  app.use('/orders', orderRouter)

  
app.use("*", (req, res, next) => {
  const error = new createError.NotFound();
  next(error);
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "internal server Error",
  });
});

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})


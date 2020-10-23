const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();
require("./models/dbConnection")();
require("dotenv").config();

process.env.secretKey = "eng_ali_gamal_@#12345^%!*^";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const expressSwagger = require("express-swagger-generator")(app);
const swaggerConfig = require("./config/swaggerConfig"); 
const userRouter = require("./routes/userRoute");
const deviceRouter = require("./routes/deviceRoute");

app.use("/api/users", userRouter);
app.use("/api/devices", deviceRouter);

expressSwagger(swaggerConfig.options);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// eslint-disable-next-line
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;

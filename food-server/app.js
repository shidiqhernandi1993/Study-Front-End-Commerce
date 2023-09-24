const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const { decodeToken } = require("./middlewares");
const productRoute = require("./app/product/router");
const categoryRoute = require("./app/category/router");
const tagRoute = require("./app/tag/router");
const authRoute = require("./app/auth/router");
const deliveryAddressRoute = require("./app/deliveryAddress/router");
const cartRoute = require("./app/cart/router");
const orderRoute = require("./app/order/router");
const invoiceRoute = require("./app/invoice/router");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(decodeToken());

app.use("/auth/v1", authRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", tagRoute);
app.use("/api/v1", deliveryAddressRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", invoiceRoute);
app.use("/", (req, res) => {
  res.render("index", {
    title: "POS API Service",
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

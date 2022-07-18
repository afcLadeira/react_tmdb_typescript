"use strict";
exports.__esModule = true;
var express_1 = require("express");
require("dotenv").config();
//const express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cors = require("cors");
var logger = require("./server/middleware/logger").logger;
var cookieParser = require("cookie-parser");
var PORT = process.env.PORT || 3001;
var app = (0, express_1["default"])();
var routes = require("./server/routes");
var errorHandler = require("./server/middleware/errorHandler").errorHandler;
var connectDB = require("./server/config/dbConn");
var PUBLIC_FOLDER = process.env.NODE_ENV === "production"
    ? path.join(__dirname, "client", "build")
    : path.join(__dirname, "client", "build");
// Connect to MongoDB
connectDB();
//custom middleware
app.use(logger);
// //cors middleware with whitelisting
var allowedOrigins = [
    "https://react-tmdb-di3a9v178-afcladeira.vercel.app",
    "https://react-tmdb-nine.vercel.app",
];
//const allowedOrigins = ['http://localhost:3001' , 'http://localhost:3000']
// //credentials middleware , before CORS!
var credentials = function (req, res, next) {
    var origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //!true : boolean , passou a ser string por causa de erro de typescript
    res.header("Access-Control-Allow-Credentials", 'true');
    //}
    next();
};
app.use(credentials);
var corsOptions = {
    origin: function (origin, callback) {
        //if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
        //} else {
        //  callback(new Error('!!!Not allowed by CORS'))
        // }
    },
    optionsSuccessStatus: 200
};
//app.use(cors(corsOptions))
app.use(cors(corsOptions));
//middleware to get formData
app.use(express_1["default"].urlencoded({ extended: true }));
//middleware for json
app.use(express_1["default"].json());
//middleware for cookies
app.use(cookieParser());
//serve static files
//app.use(express.static(path.join(__dirname, '/server/public')))
app.use("/", express_1["default"].static(PUBLIC_FOLDER));
app.use("/api", routes);
app.get("/*", function (req, res) {
    res.sendFile(path.join(PUBLIC_FOLDER, "index.html"));
});
app.use(errorHandler);
mongoose.connection.once("open", function () {
    console.log("Connected to MongoDB");
    app.listen(PORT, function () { return console.log("Server listening on ".concat(PORT)); });
});

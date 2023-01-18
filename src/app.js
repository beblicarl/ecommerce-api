const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

const CONFIG = require("./src/config");

const app = express();

app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: true,
    message: "Too many requests, please try again after 15 minutes",
});
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
    return res.json({ status: true });
});

// 404 error handler
app.all("*", (req, res, next) => {
    const error = new Error(`Cannot find the requested url ${req.originalUrl}`)
    error.status = 404
    next(error)
});

// Error Handler
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
    console.log(error.message);
});

module.exports = app;

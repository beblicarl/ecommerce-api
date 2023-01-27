const express = require("express");
const passport = require("passport");
const validateSchema = require('../../middleware/validateSchema')
const {
    signupSchema
} = require("../../schema")

const { authController } = require("../../controllers");

const authRouter = express.Router();

authRouter
    .route("/signup")
    .post(validateSchema(signupSchema), authController.signup )

module.exports = authRouter;

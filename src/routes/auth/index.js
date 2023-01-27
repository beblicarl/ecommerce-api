const express = require("express");
const passport = require("passport");
const validateSchema = require('../../middleware/validateSchema')
const {
    signupSchema, 
    signinSchema
} = require("../../schema")

const { authController } = require("../../controllers");

const authRouter = express.Router();

authRouter
    .route("/signup")
    .post(validateSchema(signupSchema), authController.signup )


authRouter
    .route("/login")
    .post(validateSchema(signinSchema), async (req, res, next) =>
	passport.authenticate("login", (err, user, info) => {
		authController.login(req, res, { err, user, info });
	})(req, res, next)
);



module.exports = authRouter;

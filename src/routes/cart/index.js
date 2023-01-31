const express = require("express");
const isAuthenticated = require("../../middleware/isAuthenticated")
const validateSchema = require('../../middleware/validateSchema')
const {
    deleteProductFromCart,
    addProductToCartSchema
} = require("../../schema")

const { cartController } = require("../../controllers");

const cartRouter = express.Router();

cartRouter.use(isAuthenticated())

cartRouter
    .route('/')
    .get(cartController.getCartProducts)

cartRouter
    .route('/:productId')
    .post(validateSchema(addProductToCartSchema), cartController.addProductsToCart)
    .delete(validateSchema(deleteProductFromCart), cartController.deleteProduct)

module.exports = cartRouter;
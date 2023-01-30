const express = require("express");
const passport = require("passport");
const isAuthenticated = require("../../middleware/isAuthenticated")
const validateSchema = require('../../middleware/validateSchema')
const {
    fetchProductSchema,
    createProductSchema,
	updateProductSchema,
	deleteProductSchema 

} = require("../../schema")

const { productController } = require("../../controllers");

const productRouter = express.Router();

productRouter.use(isAuthenticated())

productRouter
    .route('/')
    .get(productController.fetchAllProducts)
    .post( validateSchema(createProductSchema), productController.createProduct)

productRouter
    .route('/:id')
    .patch(validateSchema(updateProductSchema), productController.updateProduct)
    .get( validateSchema(fetchProductSchema), productController.fetchProduct)
    .delete(validateSchema(deleteProductSchema), productController.deleteProduct)

module.exports = productRouter;
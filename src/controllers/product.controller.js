const Product = require("../models/product.model");
const {
    transformProductResponse,
    transformProductUpdateResponse
} = require("../common/transform")




//fetch all products
const fetchAllProducts = async(req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: "desc" })
        await res.status(200).json({
            success: true,
            data: products.map((product) => ({
              ...transformProductUpdateResponse(product)
            })),
          });
    } catch (error) {
        res.status(400).send(error)
    }
}

//fetch a product
 const fetchProduct = async(req, res) => {
    try{
        const product = await Product.findOne({_id: req.params.id})
        if(!product) {
            res.status(404).send({error: "Product not found"})
        }
        res.status(200).json({
            success: true,
            data: {
              ...transformProductUpdateResponse(product)
            },
          });
    } catch (error) {
        res.status(400).send(error)
    }
}

//create a product
const createProduct = async(req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            author: req.user._id
        })
        await newProduct.save()
        res.status(201).json({
            message : "Product successfully created",
            data : transformProductResponse(newProduct)})
    } catch (error) {
        console.log({error})
        res.status(400).send({message: "error"})
    }
}

//update a product
const updateProduct = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const product = await Product.findOne({ _id: req.params.id})
    
        if(!product){
            return res.status(404).send('Product does not exist')
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.status(200).json({ 
            message : "Product successfully updated",
            data :
            transformProductUpdateResponse(product)
    })
    } catch (error) {
        res.status(400).send(error)
    }
}

//delete product
const deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete( {_id: req.params.id} )
        if(!deletedProduct) {
            res.status(404).send({error: "Product not found"})
        }
        res.status(200).json({
            message : "Product successfully deleted"
        })
    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {
 fetchAllProducts,
 fetchProduct,
 createProduct,
 updateProduct,
 deleteProduct    
}
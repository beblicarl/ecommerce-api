const Product = require("../models/product.model");




//fetch all products
const fetchAllProducts = async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send(products)
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
        res.status(200).send(product) 
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
        res.status(201).send(newProduct)
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
            return res.status(404).send()
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
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
        res.send(deletedProduct)
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
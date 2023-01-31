 const express = require('express')

 const authRouter = require('./auth')
 const productRouter = require('./product')
 const cartRouter = require('./cart')
 
 const app = express.Router()
 
 app.use('/auth', authRouter)
 app.use('/product', productRouter)
 app.use('/cart', cartRouter)

 
 module.exports = app

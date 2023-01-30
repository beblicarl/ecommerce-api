 const express = require('express')

 const authRouter = require('./auth')
 const productRouter = require('./product')
 
 const app = express.Router()
 
 app.use('/auth', authRouter)
 app.use('/product', productRouter)

 
 module.exports = app

const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductModel = new Schema({
    author : {
       type: Schema.Types.ObjectId,
       required: true,
       ref: 'User'
    },
    name: {
       type: String,
       required: true,
       trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
       type: String,
       required: true
    },
    price: {
       type: Number,
       required: true,
       default : 0
    }
    }, {
    timestamps: true
    })

const Product = mongoose.model('Product', ProductModel)

module.exports = Product
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");



//get cart items

const getCartProducts = async (req, res) => {
  const author = req.user._id;

  try {
    const cart = await Cart.findOne({ author });
    if (cart && cart.products.length > 0) {
      res.status(200).send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(500).send();
  }
};

//add cart
const addProductsToCart = async (req, res) => {

  const author = req.user._id;
  const {productId} = req.params
  const { quantity } = req.body;

  console.log(productId, 'pppppppp')
  console.log(quantity, 'qqqqqqqqq')
  
  try {
    const cart = await Cart.findOne({ author });
    const product= await Product.findOne({ _id: productId });
    
    if (!product) {
        res.status(404).send({ message: "Product not found" });
        return;
    }
    const price = product.price;
    const name = product.name;
    //If cart already exists for user,
    if (cart) {
        const productIndex = cart.products.findIndex((product) => product.productId == productId);
        //check if product exists or not
        
        if (productIndex > -1) {
            let product = cart.products[productIndex];
            product.quantity += quantity;
            console.log(cart.products ,'cccccccc')
            
        cart.bill = cart.products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity * currentValue.price;
        },0)
        
        cart.products[productIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.products.push({ productId, name, quantity, price });
        cart.bill = cart.products.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity * currentValue.price;
        },0)

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await Cart.create({
        author,
        products: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
};

//delete item in cart

const deleteProduct = async (req, res) => {
  const author = req.user._id;
 const {productId} = req.params;
  try {
    let cart = await Cart.findOne({ author });

    const productIndex = cart.products.findIndex((product) => product.productId == productId);
    
    if (productIndex > -1) {
      let product = cart.products[productIndex];
      cart.bill -= product.quantity * product.price;
      if(cart.bill < 0) {
          cart.bill = 0
      } 
      cart.products.splice(productIndex, 1);
      cart.bill = cart.products.reduce((accumulator, currentValue) => {
        return accumulator - currentValue.quantity * currentValue.price;
    },0)
      console.log(cart.bill , 'bbbbb')
      cart = await cart.save();

      res.status(200).send("Product successfully deleted");
    } else {
    res.status(404).send("Product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};



module.exports = {
    addProductsToCart,
    getCartProducts,
    deleteProduct
}
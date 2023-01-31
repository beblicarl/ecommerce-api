
const transformProductResponse = (productData) => ({
    authorId: productData.author,
    productId: productData._id,
    name: productData.name,
     description: productData.description,
    category: productData.category ,
    price: productData.price,
    createdAt:  productData.createdAt
})
const transformProductUpdateResponse = (productData) => ({
    authorId: productData.author,
    productId: productData._id,
    name: productData.name,
     description: productData.description,
    category: productData.category ,
    price: productData.price,
    createdAt:  productData.createdAt,
    updatedAt : productData.updatedAt
})

module.exports = {
    transformProductResponse,
    transformProductUpdateResponse
}
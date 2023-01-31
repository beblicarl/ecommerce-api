const Joi = require('joi')

const signupSchema = Joi.object({
	body:{	
		firstname: Joi.string().min(2).max(30).required(),
	lastname: Joi.string().min(2).max(30).required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),
	password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
		.required()
}
})

const signinSchema = Joi.object({
	body:{
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: {
					allow: ['com', 'net']
				}
			})
			.required(),
		password: Joi.string()
			.required()
	}
})

const fetchProductSchema = Joi.object({
	params: {
		id :Joi.string()
			.required()
	}
})

const createProductSchema = Joi.object({
	body: {
		 name: Joi.string().min(2).max(30).required(),
		 description: Joi.string().min(2).required(),
		 category: Joi.string().min(2).required(),
		 price: Joi.number().required().default(0)
	 
	}
})
const updateProductSchema = Joi.object({
	params : {
		id : Joi.string().required()
	},
	body: {
		 name: Joi.string().min(2).max(30),
		 description: Joi.string().min(2),
		 category: Joi.string().min(2),
		 price: Joi.number()
	 
	}
})
const deleteProductSchema = Joi.object({
	params: {
		id :Joi.string()
			.required()
	}
})

const addProductToCartSchema = Joi.object({
	params : {
		productId : Joi.string().required(),
	},
	body:{		
		quantity : Joi.number().required()
	}
})

const deleteProductFromCart = Joi.object({
	params : {
		productId : Joi.string().required()
	}
})

module.exports = {
    signinSchema,
    signupSchema,
	fetchProductSchema,
	createProductSchema,
	updateProductSchema,
	deleteProductSchema,
	addProductToCartSchema,
	deleteProductFromCart
}
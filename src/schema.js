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
		id :Joi.number()
			.required()
	}
})

const createProductSchema = Joi.object({
	body: {
		 name: Joi.string().min(2).max(30).required(),
		 description: Joi.string().min(2).required(),
		 category: Joi.string().min(2),
		 price: Joi.number().required()
	 
	}
})
const updateProductSchema = Joi.object({
	params : {
		id : Joi.number().required()
	},
	body: {
		 name: Joi.string().min(2).max(30).required(),
		 description: Joi.string().min(2).required(),
		 category: Joi.string().min(2),
		 price: Joi.number().required()
	 
	}
})
const deleteProductSchema = Joi.object({
	params: {
		id :Joi.number()
			.required()
	}
})

module.exports = {
    signinSchema,
    signupSchema,
	fetchProductSchema,
	createProductSchema,
	updateProductSchema,
	deleteProductSchema
}
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

module.exports = {
    signinSchema,
    signupSchema
}
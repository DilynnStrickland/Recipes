"use strict";
const joi = require("joi");

const validateOpts = {
    abortEarly: false,
	stripUnknown: true, 
	errors: {
		escapeHtml: true
	}
};

const loginSchema = joi.object({
    username: joi.string()
        .min(3)
        .token()
        .required(),

    password: joi.string()
        .min(6)
        .required()
});

const registerSchema = joi.object({
    username: joi.string()
        .min(3)
        .token()
        .required(),

    password: joi.string()
        .min(6)
        .required(),

    confirmPassword:joi.any()
        .valid(joi.ref('password'))
        .required(),
});

function validateRegisterBody (req, res, next) {
    const {value, error} = registerSchema.validate(req.body, validateOpts);

    if (error) {
        const errorMessages = error.details.map( detail => detail.message);
        return res.status(400).json({"errors": errorMessages});
    }

    req.body = value;

    next();
}

function validateLoginBody (req, res, next) {
    const {value, error} = loginSchema.validate(req.body, validateOpts);

    if (error) {
        const errorMessages = error.details.map( detail => detail.message);
        return res.status(400).json({"errors": errorMessages});
    }

    req.body = value;

    next();
}

function validateUsernameBody (req, res, next) {
    const {value, error} = usernameSchema.validate(req.body, validateOpts);

    if (error) {
        const errorMessages = error.details.map( detail => detail.message);
        return res.status(400).json({"errors": errorMessages});
    }

    req.body = value;

    next();
}

module.exports = {
    validateRegisterBody,
    validateLoginBody,
    validateUsernameBody
}
const Joi = require("joi");

// -------------------------
// User Registration Validator
// -------------------------
const registerUserValidator = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name should be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name should have at least 3 characters",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).max(1024).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),

  role: Joi.string().valid("user", "admin").default("user"),
  durationInMonths: Joi.number().integer().min(1).required().messages({
    "number.base": "Duration must be a number",
    "number.min": "Duration must be at least 1 month",
    "any.required": "Duration is required",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "any.required": "Amount is required",
  }),
});

// -------------------------
// User Login Validator
// -------------------------
const loginUserValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

module.exports = {
  registerUserValidator,
  loginUserValidator,
};

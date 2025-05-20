import Joi from 'joi';

export const signupSchema = Joi.object({
  names: Joi.string().min(4).required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
    'string.min': 'Name must be at least 4 characters long',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .allow('')
    .messages({
      'string.email': 'Please enter a valid email',
    }),

  phone_number: Joi.string()
    .pattern(/^\+[1-9]\d{9,14}$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'any.required': 'Phone number is required',
      'string.pattern.base': 'Phone number must include a country code and be valid',
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Password confirmation is required',
    'any.required': 'Please confirm your password',
  }),
});

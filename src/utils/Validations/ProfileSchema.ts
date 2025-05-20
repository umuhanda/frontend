import Joi from 'joi';

export const profileSchema = Joi.object({
  names: Joi.string().min(4).required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required required',
    'string.min': 'Name must be at least 4 characters long',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
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
  city: Joi.string().allow('', null),
  country: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  birth_date: Joi.alternatives()
    .try(
      Joi.date().less('now').messages({
        'date.base': 'Birth date must be a valid date',
        'date.less': 'Birth date must be in the past',
      }),
      Joi.valid(null),
      Joi.string().valid(''),
    )
    .optional(),
});

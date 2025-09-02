import Joi from 'joi';

export const signupSchema = Joi.object({
  names: Joi.string().min(4).required().messages({
    'string.empty': 'Andika amazina yawe',
    'any.required': 'Andika amazina yawe',
  }),
  phone_number: Joi.string()
    .pattern(/[1-9]/)
    .required()
    .messages({
      'string.empty': 'Andika nimero ya telephone',
      'any.required': 'Andika nimero ya telephone',
    }),
  password: Joi.string().min(4).required().messages({
    'string.min': 'Injiza umubare wawe wibanga',
    'string.empty': 'Shyiramo umubare wawe wibanga',
    'any.required': 'Shyiramo umubare wawe wibanga',
  }),
});

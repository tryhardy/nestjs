import * as Joi from 'joi';

export const UserSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
});
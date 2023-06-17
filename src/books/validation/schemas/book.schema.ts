import * as Joi from 'joi';

export const BookSchema = Joi.object().keys({
    title: Joi.string().min(2).required(),
    authors: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
});
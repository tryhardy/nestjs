import * as Joi from 'joi';

export const BookCommentSchema = Joi.object().keys({
    bookId: Joi.string().min(2).required(),
    name: Joi.string().min(2).required(),
    comment: Joi.string().min(2).required(),
});
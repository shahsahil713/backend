import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/ApiError'
import httpStatus from 'http-status';


export class UserValidation {

    public createUser = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            role: Joi.string().valid('user', 'admin'),
        })

        const result = schema.validate(request.body);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };

    public updateUser = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email(),
            role: Joi.string().valid('user', 'admin'),
            isEmailVerified: Joi.boolean(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            dob: Joi.date(),
            gender: Joi.string().valid('male','female','others'),
            address: Joi.string(),
            zip: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            profession : Joi.string(),
            speciality : Joi.string(),
        })

        const result = schema.validate(request.body);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };


    public updateProfile = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email(),
            role: Joi.string().valid('user', 'admin'),
            isEmailVerified: Joi.boolean(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            dob: Joi.date(),
            gender: Joi.string().valid('male','female','others'),
            address: Joi.string(),
            zip: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            profession : Joi.string(),
            speciality : Joi.string(),
        })

        const result = schema.validate(request.body);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };
}

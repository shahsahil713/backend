import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../utils/ApiError'
import httpStatus from 'http-status';


export class ProfessionValidation {

    public createProfession = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            name: Joi.string().required(),
        })

        const result = schema.validate(request.body);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };

    public updateProfession = (request: Request, response: Response, next: NextFunction) => {
        const schema: ObjectSchema = Joi.object().keys({
            name: Joi.string(),
        })

        const result = schema.validate(request.body);

        if (result.error) {
            throw new ApiError(httpStatus.BAD_REQUEST, result.error.message.split(`\"`).join(''));
        }
        next();
    };
    
}

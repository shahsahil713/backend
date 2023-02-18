import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/ApiError";
import httpStatus from "http-status";

export class ErrorMdValidation {
  public createErrorMd = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const schema: ObjectSchema = Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
    });

    const result = schema.validate(request.body);

    if (result.error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        result.error.message.split(`\"`).join("")
      );
    }
    next();
  };

  public updateErrorMd = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const schema: ObjectSchema = Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
    });

    const result = schema.validate(request.body);

    if (result.error) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        result.error.message.split(`\"`).join("")
      );
    }
    next();
  };
}

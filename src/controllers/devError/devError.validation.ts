import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/ApiError";
import httpStatus from "http-status";

export class DevErrorValidation {
  public createDevError = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const schema: ObjectSchema = Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
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

  public updateDevError = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const schema: ObjectSchema = Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
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

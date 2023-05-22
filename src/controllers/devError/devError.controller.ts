import { Router, Request, Response } from "express";
import httpStatus from "http-status";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { DevErrorManager } from "./devError.manager";
import catchAsync from "../../utils/asyncWrapper";
import { ApiError } from "../../utils/ApiError";
import { DevErrorValidation } from "./devError.validation";

export class DevErrorController {
  public router = Router();

  private _authMiddleware = new AuthMiddleware();
  private _devErrorValidation = new DevErrorValidation();
  private _devErrorManager = new DevErrorManager();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      catchAsync(this._authMiddleware.auth("user_get")),
      catchAsync(this.queryDevErrors.bind(this))
    );

    this.router.post(
      "/",
      catchAsync(this._authMiddleware.auth("user_update")),
      catchAsync(this._devErrorValidation.createDevError),
      catchAsync(this.createDevError.bind(this))
    );

    this.router.get(
      "/:professionId",
      catchAsync(this._authMiddleware.auth("user_get")),
      catchAsync(this.getDevErrorById.bind(this))
    );

    this.router.patch(
      "/:professionId",
      catchAsync(this._authMiddleware.auth("user_update")),
      catchAsync(this._devErrorValidation.updateDevError),
      catchAsync(this.updateDevErrorById.bind(this))
    );

    this.router.delete(
      "/:professionId",
      catchAsync(this._authMiddleware.auth("user_update")),
      catchAsync(this.deleteDevErrorById.bind(this))
    );
  }

  private createDevError = async (request: Request, response: Response) => {
    const profession = await this._devErrorManager.createDevError(request.body);
    response.status(httpStatus.CREATED).send(profession);
  };

  private queryDevErrors = async (request: Request, response: Response) => {
    const result = await this._devErrorManager.queryDevErrors();
    response.send(result);
  };

  private getDevErrorById = async (request: Request, response: Response) => {
    const profession = await this._devErrorManager.getDevErrorById(
      request.params.professionId
    );
    if (!profession) {
      throw new ApiError(httpStatus.NOT_FOUND, "Profession not found");
    }
    response.send(profession);
  };

  private updateDevErrorById = async (request: Request, response: Response) => {
    console.log("request.params.professionId::", request.params.professionId);
    const profession = await this._devErrorManager.updateDevErrorById(
      request.params.professionId,
      request.body
    );
    response.send(profession);
  };

  private deleteDevErrorById = async (request: Request, response: Response) => {
    await this._devErrorManager.deleteDevErrorById(request.params.professionId);
    response.status(httpStatus.NO_CONTENT).send();
  };
}

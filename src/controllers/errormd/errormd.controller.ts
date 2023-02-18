import { Router, Request, Response } from "express";
import httpStatus from "http-status";
import { AuthMiddleware } from "../../middlewares/authMiddleware";
import { ErrorMdManager } from "./errormd.manager";
import catchAsync from "../../utils/asyncWrapper";
import { ApiError } from "../../utils/ApiError";
import { ErrorMdValidation } from "./errormd.validation";

export class ErrorMdController {
  public router = Router();

  private _authMiddleware = new AuthMiddleware();
  private _errorMdValidation = new ErrorMdValidation();
  private _errorMdManager = new ErrorMdManager();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      catchAsync(this._authMiddleware.auth("user_get")),
      catchAsync(this.getProfessions.bind(this))
    );

    this.router.post(
      "/",
      catchAsync(this._authMiddleware.auth("user_update")),
      catchAsync(this._errorMdValidation.createErrorMd),
      catchAsync(this.createProfession.bind(this))
    );

    this.router.get(
      "/:professionId",
      catchAsync(this._authMiddleware.auth("user_get")),
      catchAsync(this.getProfession.bind(this))
    );

    this.router.patch(
      "/:professionId",
      catchAsync(this._authMiddleware.auth("user_update")),
      catchAsync(this._errorMdValidation.updateErrorMd),
      catchAsync(this.updateProfession.bind(this))
    );

    this.router.delete(
      "/:professionId",
      catchAsync(this._authMiddleware.auth("user_update")),
      catchAsync(this.deleteProfession.bind(this))
    );
  }

  private createProfession = async (request: Request, response: Response) => {
    const profession = await this._errorMdManager.createErrorMd(request.body);
    response.status(httpStatus.CREATED).send(profession);
  };

  private getProfessions = async (request: Request, response: Response) => {
    const result = await this._errorMdManager.queryErrorMds();
    response.send(result);
  };

  private getProfession = async (request: Request, response: Response) => {
    const profession = await this._errorMdManager.getErrorMdById(
      request.params.professionId
    );
    if (!profession) {
      throw new ApiError(httpStatus.NOT_FOUND, "Profession not found");
    }
    response.send(profession);
  };

  private updateProfession = async (request: Request, response: Response) => {
    const profession = await this._errorMdManager.updateErrorMdById(
      request.params.professionId,
      request.body
    );
    response.send(profession);
  };

  private deleteProfession = async (request: Request, response: Response) => {
    await this._errorMdManager.deleteErrorMdById(request.params.professionId);
    response.status(httpStatus.NO_CONTENT).send();
  };
}

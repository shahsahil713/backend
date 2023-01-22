import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { ProfessionManager } from './profession.manager';
import catchAsync from '../../utils/asyncWrapper'
import { ApiError } from '../../utils/ApiError'
import { ProfessionValidation } from './profession.validation'

export class ProfessionController {
    public router = Router();

    private _authMiddleware = new AuthMiddleware();
    private _professionValidation = new ProfessionValidation();
    private _professionManager = new ProfessionManager();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get('/',
            catchAsync(this._authMiddleware.auth('user_get')),
            catchAsync(this.getProfessions.bind(this))
        );

        this.router.post('/',
            catchAsync(this._authMiddleware.auth('user_update')),
            catchAsync(this._professionValidation.createProfession),
            catchAsync(this.createProfession.bind(this))
        );

        this.router.get('/:professionId',
            catchAsync(this._authMiddleware.auth('user_get')),
            catchAsync(this.getProfession.bind(this))
        );

        this.router.patch('/:professionId',
            catchAsync(this._authMiddleware.auth('user_update')),
            catchAsync(this._professionValidation.updateProfession),
            catchAsync(this.updateProfession.bind(this))
        );

        this.router.delete('/:professionId',
            catchAsync(this._authMiddleware.auth('user_update')),
            catchAsync(this.deleteProfession.bind(this))
        );

    }

    private createProfession = async (request: Request, response: Response) => {
        const profession = await this._professionManager.createProfession(request.body);
        response.status(httpStatus.CREATED).send(profession);
    }

    private getProfessions = async (request: Request, response: Response) => {
        const result = await this._professionManager.queryProfessions();
        response.send(result);
    }

    private getProfession = async (request: Request, response: Response) => {
        const profession = await this._professionManager.getProfessionById(request.params.professionId);
        if (!profession) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Profession not found');
        }
        response.send(profession);
    }

    private updateProfession = async (request: Request, response: Response) => {
        const profession = await this._professionManager.updateProfessionById(request.params.professionId, request.body);
        response.send(profession);
    }

    private deleteProfession = async (request: Request, response: Response) => {
        await this._professionManager.deleteProfessionById(request.params.professionId);
        response.status(httpStatus.NO_CONTENT).send();
    }

}


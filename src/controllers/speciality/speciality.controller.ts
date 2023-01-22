import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthMiddleware } from '../../middlewares/authMiddleware';
import { SpecialityManager } from './speciality.manager';
import catchAsync from '../../utils/asyncWrapper'
import { ApiError } from '../../utils/ApiError'
import { SpecialityValidation } from './speciality.validation'
import pick from '../../utils/pick';

export class SpecialityController {
    public router = Router();

    private _authMiddleware = new AuthMiddleware();
    private _specialityValidation = new SpecialityValidation();
    private _specialityManager = new SpecialityManager();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get('/',
            catchAsync(this._authMiddleware.auth('user_get')),
            catchAsync(this.getSpecialities.bind(this))
        );

        this.router.post('/',
            catchAsync(this._authMiddleware.auth('user_update')),
            catchAsync(this._specialityValidation.createSpeciality),
            catchAsync(this.createSpeciality.bind(this))
        );

        this.router.get('/:specialityId',
            catchAsync(this._authMiddleware.auth('user_get')),
            catchAsync(this.getSpeciality.bind(this))
        );

        this.router.patch('/:specialityId',
            catchAsync(this._authMiddleware.auth('user_update')),
            catchAsync(this._specialityValidation.updateSpeciality),
            catchAsync(this.updateSpeciality.bind(this))
        );

        this.router.delete('/:specialityId',
            catchAsync(this._authMiddleware.auth('user_update')),
            catchAsync(this.deleteSpeciality.bind(this))
        );

    }

    private createSpeciality = async (request: Request, response: Response) => {
        const speciality = await this._specialityManager.createSpeciality(request.body);
        response.status(httpStatus.CREATED).send(speciality);
    }

    private getSpecialities = async (request: Request, response: Response) => {
        const filter = pick(request.query, ['profession']);
        const result = await this._specialityManager.querySpecialities(filter);
        response.send(result);
    }

    private getSpeciality = async (request: Request, response: Response) => {
        const speciality = await this._specialityManager.getSpecialityById(request.params.specialityId);
        if (!speciality) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Speciality not found');
        }
        response.send(speciality);
    }

    private updateSpeciality = async (request: Request, response: Response) => {
        const speciality = await this._specialityManager.updateSpecialityById(request.params.specialityId, request.body);
        response.send(speciality);
    }

    private deleteSpeciality = async (request: Request, response: Response) => {
        await this._specialityManager.deleteSpecialityById(request.params.specialityId);
        response.status(httpStatus.NO_CONTENT).send();
    }

}


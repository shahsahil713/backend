import { ApiError } from '../../utils/ApiError';
import { FilterQuery, ObjectId } from 'mongoose'
import httpStatus from 'http-status';
import { Speciality } from '../../models/speciality.model';


export class SpecialityManager {

    public createSpeciality = async (speciality: Speciality): Promise<Speciality> => {
        return Speciality.create(speciality);
    }

    public getSpecialityById = async (id: ObjectId | string): Promise<Speciality> => {
        return Speciality.findById(id);
    };

    public querySpecialities = async (filter?: FilterQuery<Speciality>): Promise<Speciality[]> => {
        const speciality = await Speciality.find(filter).lean();
        return speciality;
    };

    public updateSpecialityById = async (specialityId: ObjectId | string, updateBody: { name: string; }): Promise<Speciality> => {
        const speciality = await this.getSpecialityById(specialityId);
        if (!speciality) {
            throw new ApiError(httpStatus.NOT_FOUND, 'speciality not found');
        }
       
        Object.assign(speciality, updateBody);
        await Speciality.updateOne({ _id: speciality.id }, speciality, { multi: true })
        return speciality;
    };

    public deleteSpecialityById = async (specialityId: string): Promise<Speciality> => {
        const speciality = await this.getSpecialityById(specialityId);
        if (!speciality) {
            throw new ApiError(httpStatus.NOT_FOUND, 'speciality not found');
        }
        await Speciality.deleteOne({ _id: speciality.id });
        return speciality;
    };

}


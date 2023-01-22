import { ApiError } from '../../utils/ApiError';
import { ObjectId } from 'mongoose'
import httpStatus from 'http-status';
import { Profession } from '../../models/profession.model';


export class ProfessionManager {

    public createProfession = async (profession: Profession): Promise<Profession> => {
        return Profession.create(profession);
    }

    public getProfessionById = async (id: ObjectId | string): Promise<Profession> => {
        return Profession.findById(id);
    };

    public queryProfessions = async (): Promise<Profession[]> => {
        const profession = await Profession.find().lean();
        return profession;
    };

    public updateProfessionById = async (professionId: ObjectId | string, updateBody: { name: string; }): Promise<Profession> => {
        const profession = await this.getProfessionById(professionId);
        if (!profession) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Profession not found');
        }
       
        Object.assign(profession, updateBody);
        await Profession.updateOne({ _id: profession.id }, profession, { multi: true })
        return profession;
    };

    public deleteProfessionById = async (professionId: string): Promise<Profession> => {
        const profession = await this.getProfessionById(professionId);
        if (!profession) {
            throw new ApiError(httpStatus.NOT_FOUND, 'profession not found');
        }
        await Profession.deleteOne({ _id: profession.id });
        return profession;
    };

}


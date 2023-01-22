import { Schema, model } from 'mongoose';
import toJSON from './plugins/toJSON.plugin'

export interface Speciality {
    id?: Schema.Types.ObjectId;
    profession: Schema.Types.ObjectId;
    name: string;
}

export const schema = new Schema<Speciality>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        profession:{
            type: Schema.Types.ObjectId,
            ref: "Profession",
        }
    },
    { timestamps: true }
);

schema.plugin(toJSON);

export const Speciality = model<Speciality>('Speciality', schema);

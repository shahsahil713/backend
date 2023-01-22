import { Schema, model } from 'mongoose';
import toJSON from './plugins/toJSON.plugin'

export interface Profession {
    id?: Schema.Types.ObjectId;
    name: string;
}

export const schema = new Schema<Profession>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

schema.plugin(toJSON);

export const Profession = model<Profession>('Profession', schema);

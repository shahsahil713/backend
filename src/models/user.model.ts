import { Schema, model, Model, FilterQuery, ProjectionType } from 'mongoose';
import bcrypt from 'bcrypt';
import type { NextFunction } from 'express';
import { Roles } from '../config/roles';
import paginate from './plugins/paginate.plugin'
import toJSON from './plugins/toJSON.plugin'

export interface User {
    id?: Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    mobile: string;
    dob: Date;
    gender: string;
    address: string;
    zip: string;
    city: string;
    state: string;
    profession: Schema.Types.ObjectId;
    speciality: Schema.Types.ObjectId;
    password: string;
    role?: string;
    isEmailVerified?: boolean;
    isPasswordMatch?(password: string): Promise<boolean>;
}

interface UserModelInterface extends Model<User> {
    // declare any static methods here
    paginate(filter: FilterQuery<User>, options: ProjectionType<User>): Promise<User[]>;
    isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
    isUsernameTaken(username: string, excludeUserId?: string): Promise<boolean>;
    isPhoneTaken(mobile: string): Promise<boolean>;
}

export const schema = new Schema<User>(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        firstName: String,
        lastName: String,
        mobile: {
            type: String,
            // unique: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            lowercase: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        dob: Date,
        gender: {
            type: String,
            enum: ['male', 'female', 'others']
        },
        address: String,
        city: String,
        zip: String,
        state: String,
        profession: {
            type: Schema.Types.ObjectId,
            ref: "Profession",
        },
        speciality: {
            type: Schema.Types.ObjectId,
            ref: "Speciality",
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            private: true, // used by the toJSON plugin
        },
        role: {
            type: String,
            enum: Roles.roles,
            default: 'user',
        }
    },
    { timestamps: true }
);

schema.method('isPasswordMatch', function (password: string): Promise<boolean> {
    const user = this;
    return bcrypt.compare(password, user.password);
});

schema.static('isEmailTaken', async function (email: string, excludeUserId: string): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
});

schema.static('isUsernameTaken', async function (username: string, excludeUserId?: string): Promise<boolean> {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !!user;
});

schema.static('isPhoneTaken', async function (mobile: string): Promise<boolean> {
    const user = await this.findOne({ mobile });
    return !!user;
});

schema.pre('save', async function (next: NextFunction) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

schema.plugin(toJSON);
schema.plugin(paginate);

export const User = model<User, UserModelInterface>('User', schema);

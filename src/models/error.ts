import { string } from "joi";
import { Schema, model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

export interface Error {
  id?: Schema.Types.ObjectId;
  title: string;
  description: string;
  fullDescription: string;
  category: Schema.Types.ObjectId;
  media: string;
  owner: Schema.Types.ObjectId;
  solutions: Schema.Types.ObjectId[];
  link: string;
}

export const schema = new Schema<Error>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    category: {
      ref: "category",
      type: Schema.Types.ObjectId,
    },
    media: {
      type: String,
    },
    owner: {
      ref: "user",
      type: Schema.Types.ObjectId,
    },
    solutions: [
      {
        ref: "solution",
        type: Schema.Types.ObjectId,
      },
    ],
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

schema.plugin(toJSON);

export const Error = model<Error>("Error", schema);

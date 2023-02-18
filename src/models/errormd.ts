import { Schema, model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

export interface ErrorMd {
  id?: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  title: string;
  description: string;
}

export const schema = new Schema<ErrorMd>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

schema.plugin(toJSON);

export const ErrorMd = model<ErrorMd>("ErrorMd", schema);

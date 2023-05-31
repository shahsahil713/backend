import { Schema, model } from "mongoose";
import toJSON from "./plugins/toJSON.plugin";

export interface DevError {
  id?: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  title: string;
  description: string;
  category:string;
}

export const schema = new Schema<DevError>(
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
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

schema.plugin(toJSON);

export const DevError = model<DevError>("DevError", schema);

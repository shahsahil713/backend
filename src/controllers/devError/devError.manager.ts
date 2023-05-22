import { ApiError } from "../../utils/ApiError";
import { ObjectId } from "mongoose";
import httpStatus from "http-status";
import { DevError } from "../../models/devError";

export class DevErrorManager {
  public createDevError = async (devError: DevError): Promise<DevError> => {
    return DevError.create(devError);
  };

  public getDevErrorById = async (id: ObjectId | string): Promise<DevError> => {
    return DevError.findById(id);
  };

  public queryDevErrors = async (): Promise<DevError[]> => {
    const devErrors = await DevError.find().lean();
    return devErrors;
  };

  public updateDevErrorById = async (
    devErrorId: ObjectId | string,
    updateBody: DevError
  ): Promise<DevError> => {
    const devError = await this.getDevErrorById(devErrorId);
    if (!devError) {
      throw new ApiError(httpStatus.NOT_FOUND, "devError not found");
    }
    console.log("devError::", devError);
    Object.assign(devError, updateBody);

    await DevError.updateOne({ _id: devError.id }, devError);
    return devError;
  };

  public deleteDevErrorById = async (devErrorId: string): Promise<DevError> => {
    const devError = await this.getDevErrorById(devErrorId);
    if (!devError) {
      throw new ApiError(httpStatus.NOT_FOUND, "devError not found");
    }
    await DevError.deleteOne({ _id: devError.id });
    return devError;
  };
}

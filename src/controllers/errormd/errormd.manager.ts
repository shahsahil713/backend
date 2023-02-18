import { ApiError } from "../../utils/ApiError";
import { ObjectId } from "mongoose";
import httpStatus from "http-status";
import { ErrorMd } from "../../models/errormd";

export class ErrorMdManager {
  public createErrorMd = async (errorMd: ErrorMd): Promise<ErrorMd> => {
    return ErrorMd.create(errorMd);
  };

  public getErrorMdById = async (id: ObjectId | string): Promise<ErrorMd> => {
    return ErrorMd.findById(id);
  };

  public queryErrorMds = async (): Promise<ErrorMd[]> => {
    const errorMds = await ErrorMd.find().lean();
    return errorMds;
  };

  public updateErrorMdById = async (
    errorMdId: ObjectId | string,
    updateBody: { name: string }
  ): Promise<ErrorMd> => {
    const errorMd = await this.getErrorMdById(errorMdId);
    if (!errorMd) {
      throw new ApiError(httpStatus.NOT_FOUND, "errorMd not found");
    }

    Object.assign(errorMd, updateBody);
    await ErrorMd.updateOne({ _id: errorMd.id }, errorMd, {
      multi: true,
    });
    return errorMd;
  };

  public deleteErrorMdById = async (errorMdId: string): Promise<ErrorMd> => {
    const errorMd = await this.getErrorMdById(errorMdId);
    if (!errorMd) {
      throw new ApiError(httpStatus.NOT_FOUND, "errorMd not found");
    }
    await ErrorMd.deleteOne({ _id: errorMd.id });
    return errorMd;
  };
}

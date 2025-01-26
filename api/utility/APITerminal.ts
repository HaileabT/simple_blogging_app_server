import { Response } from "express";
import { ServerSuccessResponse } from "../types/app/ServerSucessResponse";
import { ServerErrorResponse } from "../types/app/ServerErrorResponse";
import { AppError } from "../../shared/datastructures/AppError";
import { AppErrorCodes } from "../types/app/ErrorResponseData";

export class APITerminal {
  static respondWithSuccess<T>(res: Response, data: T, statusCode: number) {
    const response: ServerSuccessResponse<T> = {
      status: "success",
      data: data,
    };
    res.status(statusCode).json(response);
  }

  static respondWithError(
    res: Response,
    status: "error" | "fail",
    error: AppError,
    statusCode: number,
    errorCode?: AppErrorCodes
  ) {
    const response: ServerErrorResponse = {
      status: status,
      error: {
        errorCode: errorCode ? errorCode : "INTERNAL_ERROR",
        message: error.message,
        errors: error.errors ? error.errors : undefined,
      },
    };
    res.status(statusCode).json(response);
  }
}

import { AppError } from "../../../shared/datastructures/AppError";
import { ErrorResponseData } from "../app/ErrorResponseData";

export interface ServerErrorResponse {
  status: "error" | "fail";
  error: ErrorResponseData;
}

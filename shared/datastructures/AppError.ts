import { UnitError } from "../../api/types/app/ErrorResponseData";

export class AppError extends Error {
  constructor(public statusCode: number, public message: string, public errors?: UnitError[]) {
    super(message);
  }
}

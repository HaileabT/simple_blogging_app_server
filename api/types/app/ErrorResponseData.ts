export interface ErrorResponseData {
  errorCode: AppErrorCodes;
  message: string;
  errors?: UnitError[];
}

export interface UnitError {
  location: string;
  message: string;
}

export type AppErrorCodes = "INTERNAL_ERROR" | "INPUT_ERROR" | "UNAUTHORIZED" | "UNKNOWN_USER";

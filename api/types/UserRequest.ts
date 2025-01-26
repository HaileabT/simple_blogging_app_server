import { Request } from "express";

export interface UserByIdRequest extends Request {
  params: {
    id: string;
  };
}

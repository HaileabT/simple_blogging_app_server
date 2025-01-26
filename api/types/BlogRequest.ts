import { Request } from "express";

export interface BlogByIdRequest extends Request {
  params: {
    id: string;
  };
}

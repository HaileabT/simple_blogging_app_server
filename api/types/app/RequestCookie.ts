import { Request } from "express";
import { UserI } from "../../../Entites/Iuser";

export interface RequestCookie extends Request {
  cookies: {
    "auth-token": string;
  };
}

export interface AuthenticUserAttachedRequest extends RequestCookie {
  params: {
    id?: string;
  };
  user?: UserI;
}

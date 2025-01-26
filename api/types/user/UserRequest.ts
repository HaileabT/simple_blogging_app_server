import { Request } from "express";

export interface UserByIdRequest extends Request {
  params: {
    id: string;
  };
}

export interface LoginRequest extends Request {
  body: {
    name: string;
    password: string;
  };
}

export interface SignupRequest extends Request {
  body: {
    name: string;
    password: string;
  };
}

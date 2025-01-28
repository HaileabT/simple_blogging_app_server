import { Request } from "express";

export interface BlogByIdRequest extends Request {
  params: {
    id: string;
  };
}

export interface CreateBlogRequest extends Request {
  body: {
    title: string;
    body: string;
  };
}

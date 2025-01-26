import { UserI } from "./Iuser";
export interface BlogI {
  id: string;
  title: string;
  body: string;
  user: UserI;
  Date: Date;
}

import { BlogI } from "./Iblog";
export interface UserI {
  id: string;
  name: string;
  password: string;
  Blog?: BlogI[];
}

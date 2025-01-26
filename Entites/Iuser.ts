import { BlogI } from "./Iblog";
export interface UserI {
  id: string;
  name: string;
  Blog?: BlogI[];
}

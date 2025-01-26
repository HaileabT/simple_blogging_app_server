import { UserI } from "../../../Entites/Iuser";
import { AuthPayload } from "../auth/AuthProviderPayload";

export interface LoginResponseData {
  token: string;
  user: AuthPayload;
}

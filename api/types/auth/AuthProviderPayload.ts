import { JwtPayload } from "jsonwebtoken";

export type AuthProviderSignReturn = {
  token: string;
};

export interface AppJWTPayload extends JwtPayload {
  id: string;
}

export interface AuthPayload {
  name: string;
  id: string;
}

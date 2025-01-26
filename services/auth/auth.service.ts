import { AppJWTPayload, AuthProviderSignReturn } from "../../api/types/auth/AuthProviderPayload";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../../shared/utils/env";
import { AppError } from "../../shared/datastructures/AppError";

export class AuthServiceProvider {
  static authService: AuthServiceProvider | null = null;

  private constructor() {}

  static getProvider() {
    if (!AuthServiceProvider.authService) {
      AuthServiceProvider.authService = new AuthServiceProvider();
    }
    return AuthServiceProvider.authService;
  }

  signAuthentication(payload: string): AuthProviderSignReturn {
    const token = jwt.sign({ id: payload }, ENV.authSecretKey ?? "", {
      expiresIn: "30d",
    });

    return { token };
  }

  authenticate(token: string): string {
    const secretKey = ENV.authSecretKey;

    if (!secretKey) throw new AppError(500, "Something went wrong.");

    if (!token.trim()) throw new AppError(402, "Bad call.");

    try {
      const verification: AppJWTPayload = jwt.verify(token, secretKey) as AppJWTPayload;

      if (!verification) throw new AppError(500, "Something went wrong.");

      const expDate = verification.exp ?? 0;

      const now = Date.now();

      if (now > expDate) throw new AppError(400, "Session Expired.");

      if (!verification.id) throw new AppError(500, "Something went wrong.");

      return verification.id;
    } catch (err: any) {
      throw new AppError(403, "Authentication Failed.");
    }
  }
}

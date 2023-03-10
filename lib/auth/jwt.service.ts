import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import {
  BadRequestException,
  UnauthorizedException,
} from "next-api-decorators";

export class JwtService {
  private jwtSecret = process.env.JWT_SECRET!;

  async getPayload(authToken: string): Promise<User> {
    if (!authToken) {
      throw new BadRequestException(`No token was attached to this request.`);
    }
    const isTokenVerified = await this.verify(authToken);
    if (isTokenVerified) {
      return this.decode(authToken);
    } else {
      throw new UnauthorizedException(`You're not allowed to do that`);
    }
  }

  async decode(token: string): Promise<any> {
    return jwt.decode(token);
  }

  async sign(payload: any): Promise<string> {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: "7d" });
  }

  async verify(token: string): Promise<any> {
    return jwt.verify(token, this.jwtSecret);
  }
}

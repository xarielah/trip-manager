import type { NextApiResponse } from "next";
import {
  Body,
  createHandler,
  Post,
  Res,
  ValidationPipe,
} from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { AuthService } from "../../../lib/auth/auth.service";
import { LoginDto } from "../../../lib/auth/dto/login.dto";
import { RegisterDto } from "../../../lib/auth/dto/register.dto";
import * as cookie from "cookie";

@autoInjectable()
class AuthHandler {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async loginHandler(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Res() res: NextApiResponse
  ): Promise<any> {
    const { payload, accessToken } = await this.authService.handleLogin(
      loginDto
    );

    // const cookieString = cookie.serialize("token", accessToken, {
    //   maxAge: 60 * 60 * 24 * 7,
    //   path: "/",
    //   sameSite: "strict",
    //   domain: process.env.BASE_URL ?? "http://localhost:3000",
    // });
    // `token=${accessToken};MaxAge=${
    //   60 * 60 * 24 * 7
    // };Path="/";SameSite=strict;Domain=${
    //   process.env.BASE_URL ?? "http://localhost:3000"
    // }`;

    // res.setHeader("Set-Cookie", cookieString);
    return { username: payload.username, email: payload.email, accessToken };
  }

  @Post("/register")
  async registerHandler(
    @Body(ValidationPipe) registerDto: RegisterDto
  ): Promise<any> {
    return this.authService.handleRegister(registerDto);
  }
}

export default createHandler(AuthHandler);

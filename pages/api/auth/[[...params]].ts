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
    const cookieString = cookie.serialize("token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
      domain: process.env.BASE_URL ?? "http://localhost:3000",
    });

    res.setHeader("Set-Cookie", cookieString);
    return { username: payload.username, email: payload.email };
  }

  @Post("/register")
  async registerHandler(
    @Body(ValidationPipe) registerDto: RegisterDto
  ): Promise<any> {
    return this.authService.handleRegister(registerDto);
  }

  @Post("/logout")
  logoutHandler(@Res() res: NextApiResponse): void {
    /**
     * This will send an HttpOnly cookie that is already expired.
     * Expiration set to 1969, therefore the browser will remove the cookie.
     */
    const logoutCookieString = cookie.serialize("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      path: "/",
      sameSite: "strict",
      domain: process.env.BASE_URL ?? "http://localhost:3000",
    });
    res.setHeader("Set-Cookie", logoutCookieString);
    res.status(200).json({ message: "Logged out successfully" });
  }
}

export default createHandler(AuthHandler);

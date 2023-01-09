import { NextApiRequest } from "next";
import { Body, Post, Req, ValidationPipe } from "next-api-decorators";
import { createHandler } from "next-api-decorators/dist/createHandler";
import { autoInjectable } from "tsyringe";
import { AuthService } from "../../../lib/auth/auth.service";
import { RegisterDto } from "../../../lib/auth/dto/register.dto";

@autoInjectable()
class RegisterHandler {
  constructor(private authService: AuthService) {}

  @Post()
  async registerHandler(
    @Body(ValidationPipe) registerDto: RegisterDto
  ): Promise<any> {
    return this.authService.handleRegister(registerDto);
  }
}

export default createHandler(RegisterHandler);

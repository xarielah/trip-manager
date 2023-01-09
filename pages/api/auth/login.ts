import { Body, createHandler, Post, ValidationPipe } from "next-api-decorators";
import { autoInjectable } from "tsyringe";
import { AuthService } from "../../../lib/auth/auth.service";
import { LoginDto } from "../../../lib/auth/dto/login.dto";

@autoInjectable()
class LoginHandler {
  constructor(private authService: AuthService) {}

  @Post()
  async loginHandler(@Body(ValidationPipe) loginDto: LoginDto): Promise<any> {
    return this.authService.handleLogin(loginDto);
  }
}

export default createHandler(LoginHandler);

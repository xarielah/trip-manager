import {
  ConflictException,
  InternalServerErrorException,
  SetHeader,
  UnauthorizedException,
} from "next-api-decorators";
import * as argon2 from "argon2";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./user.service";
import { autoInjectable } from "tsyringe";
import { JwtService } from "./jwt.service";

@autoInjectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  /**
   * Registers a new User with username, password, email.
   * @param {RegisterDto} registerDto register data.
   * @returns user data or error.
   */
  async handleRegister(registerDto: RegisterDto): Promise<any> {
    const areExisting = await this.userService.getUserByEmailOrUsername(
      registerDto.username,
      registerDto.email
    );

    if (areExisting && areExisting.length > 0)
      throw new ConflictException("Username or email must be unique");

    try {
      const hashedPassword = await argon2.hash(registerDto.password);

      // These lines handle the confirmPassword field so that it would not get into the handler.
      const sanitizeData = { ...registerDto };
      delete (sanitizeData as any).confirmPassword;

      const newUser = await this.userService.create({
        ...sanitizeData,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Handle login action by username and password.
   * @param loginDto login data.
   * @returns {String} access token
   */
  async handleLogin(loginDto: LoginDto): Promise<any> {
    const foundUser = await this.userService.get({
      username: loginDto.username,
    });

    if (foundUser) {
      const isPwOk = await argon2.verify(foundUser.password, loginDto.password);

      if (isPwOk) {
        const payload = {
          username: foundUser.username,
          email: foundUser.email,
        };

        const accessToken = await this.jwtService.sign(payload);
        return { accessToken: accessToken, payload };
      } else {
        throw new UnauthorizedException("Bad username or password.");
      }
    } else {
      throw new UnauthorizedException("Bad username or password.");
    }
  }
}

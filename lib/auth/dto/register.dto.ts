import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(34)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(34)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

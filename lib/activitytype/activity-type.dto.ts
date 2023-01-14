import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ActivityTypeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  color: string;
}

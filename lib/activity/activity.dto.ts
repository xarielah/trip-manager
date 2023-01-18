import { IsOptional, IsString, MaxLength } from "class-validator";

export class ActivityDto {
  @IsString()
  @MaxLength(64)
  name: string;

  @MaxLength(256)
  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  targetDate: string;

  @IsString()
  typeId: string;

  @IsString()
  tripId: string;
}

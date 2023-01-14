import {
  IsDateString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from "class-validator";

export class ActivityDto {
  @IsString()
  @MaxLength(64)
  name: string;

  @IsOptional()
  @MaxLength(256)
  @IsString()
  comment: string;

  @IsOptional()
  @IsDateString()
  targetDate: string;

  @IsString()
  @Length(36, 36)
  typeId: string;

  @IsString()
  @Length(36, 36)
  tripId: string;
}

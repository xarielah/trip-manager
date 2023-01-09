// model Trip {
//     id         String     @id() @default(uuid())
//     name       String     @unique()
//     startDate  DateTime
//     endDate    DateTime
//     country    String
//     activities Activity[]
//     owner      User       @relation(fields: [ownerId], references: [id])
//     ownerId    String
//   }

import { IsDateString, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class TripDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  country: string;
}

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
  IsPositive,
  MinLength,
} from "class-validator";

export class CreateAnimalDTO {
  @IsNotEmpty({ message: "A name is required" })
  @IsString({ message: "The name must be a string" })
  @MinLength(2, { message: "The name must be at least 2 characters long" })
  name!: string;

  @IsNotEmpty({ message: "A specy is required" })
  @IsString({ message: "The specy must be a string" })
  @MinLength(2, { message: "The specy must be at least 2 characters long" })
  species!: string;

  @IsOptional()
  @IsDate({ message: "Birth date must be a valid date" })
  @Transform(({ value }) => new Date(value), { toClassOnly: true }) // Transform ISO string to Date
  birth_date?: Date;
}

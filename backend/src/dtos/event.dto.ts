import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
  IsPositive,
} from "class-validator";

export class CreateEventDTO {
  @IsNotEmpty({ message: "Event type is required" })
  @IsString({ message: "Event type must be a string" })
  type!: string;

  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;

  @IsOptional()
  @IsDate({ message: "Event date must be a valid date" })
  event_date?: Date;

  @IsNotEmpty({ message: "Animal ID is required" })
  @IsUUID("all", { message: "Animal ID must be a valid UUID" })
  animal_id!: string;
}

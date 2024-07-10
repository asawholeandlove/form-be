// create-form.dto.ts
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  isEnum,
} from "class-validator";
import { FieldType } from "src/constants/forms.constant";

class FieldDto {
  @IsEnum(FieldType)
  @IsNotEmpty()
  type: FieldType;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsBoolean()
  @IsNotEmpty({
    message: "You have to specify if the field is required or not.",
  })
  required: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  fields: FieldDto[];
}

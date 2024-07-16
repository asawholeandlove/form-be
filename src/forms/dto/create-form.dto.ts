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
import { TFieldType } from "src/constants/forms.constant";

class FieldDto {
  @IsEnum(TFieldType)
  @IsNotEmpty()
  type: TFieldType;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsBoolean()
  @IsNotEmpty({
    message: "You have to specify if the field is required or not.",
  })
  required: boolean;

  defaultValue?: string;

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

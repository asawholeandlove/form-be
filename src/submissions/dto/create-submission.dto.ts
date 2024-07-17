import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class FieldAnswerDto {
  @IsString()
  @IsNotEmpty()
  fieldId: string;

  value: any | any[];
}

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  form: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldAnswerDto)
  answers: FieldAnswerDto[];
}

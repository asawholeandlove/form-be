import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { FieldType } from "src/constants/forms.constant";

export type FormDocument = HydratedDocument<Form>;

@Schema()
class Field {
  @Prop({ required: true, enum: FieldType })
  type: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  required: boolean;

  @Prop([String])
  options?: string[];
}

@Schema({ timestamps: true })
export class Form {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([Field])
  fields: Field[];
}

export const FormSchema = SchemaFactory.createForClass(Form);

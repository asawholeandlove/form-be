import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { Field, Form } from "src/forms/schemas/form.schema";

export type SubmissionDocument = HydratedDocument<Submission>;

@Schema()
export class FieldAnswer extends Field {
  @Prop({ required: true })
  fieldId: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
  value: any | any[];
}

@Schema({
  timestamps: true,
})
export class Submission {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Form.name,
    required: true,
  })
  @Type(() => Form)
  form: Form;

  @Prop([FieldAnswer])
  answers: FieldAnswer[];
}

const SubmissionSchema = SchemaFactory.createForClass(Submission);

export { SubmissionSchema };

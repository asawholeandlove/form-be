import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { FieldType } from "src/constants/forms.constant";
import { User, UserSchema } from "src/users/schemas/user.schema";

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

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Form {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop([Field])
  fields: Field[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  createdBy: User;
}

const FormSchema = SchemaFactory.createForClass(Form);

FormSchema.virtual("createdById").get(function () {
  return this.createdBy ? (this.createdBy as any)._id : null;
});

FormSchema.virtual("createdByUsername").get(function () {
  return this.createdBy ? this.createdBy.username : null;
});

export { FormSchema };

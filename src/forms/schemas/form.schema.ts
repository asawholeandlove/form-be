import { UseInterceptors } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { TFieldType } from "src/constants/forms.constant";
import { User } from "src/users/schemas/user.schema";

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Field {
  _id: ObjectId;

  @Prop({ required: true, enum: TFieldType })
  type: string;

  @Exclude()
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
  _id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop([Field])
  fields: Field[];

  @Prop({ default: true })
  isPublic: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  createdBy: User;

  @Prop()
  @Transform(({ value }) => "hihi")
  updatedAt: string;
}

const FormSchema = SchemaFactory.createForClass(Form);

FormSchema.virtual("createdById").get(function () {
  return this.createdBy ? (this.createdBy as any)._id : null;
});

FormSchema.virtual("createdByUsername").get(function () {
  return this.createdBy ? this.createdBy.username : null;
});

export { FormSchema };

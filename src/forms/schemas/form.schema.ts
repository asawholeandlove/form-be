import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Type } from "class-transformer";
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

  @Prop()
  defaultValue?: string;

  @Prop([String])
  options?: string[];
}

@Schema()
class Page {
  @Prop()
  content?: string;

  @Prop()
  isShow?: boolean;
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

  @Prop()
  isPublic: boolean;

  @Prop({ type: Page })
  startPage?: Page;

  @Prop({ type: Page })
  endPage?: Page;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  createdBy: User;

  // @Prop()
  // @Transform(({ value }) => "hihi")
  // updatedAt: string;
}

const FormSchema = SchemaFactory.createForClass(Form);

FormSchema.virtual("createdById").get(function () {
  return this.createdBy ? (this.createdBy as any)._id : null;
});

FormSchema.virtual("createdByUsername").get(function () {
  return this.createdBy ? this.createdBy.username : null;
});

export { FormSchema };

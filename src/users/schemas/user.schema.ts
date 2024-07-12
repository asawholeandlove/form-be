import { UseInterceptors } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true }) // Enable timestamps
export class User {
  @Prop({
    required: true,
  })
  username: string;

  @Exclude()
  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  phone: string;

  @Exclude()
  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

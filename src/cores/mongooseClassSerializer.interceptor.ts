import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from "@nestjs/common";
import { ClassTransformOptions, plainToClass } from "class-transformer";
import { Document } from "mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }

      const plainObject = this.convertObjectIds(document.toJSON());
      return plainToClass(classToIntercept, plainObject);
    }

    private convertObjectIds(obj: any): any {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.convertObjectIds(item));
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj)) {
          if (obj[key] instanceof mongoose.Types.ObjectId) {
            obj[key] = obj[key].toString();
          } else if (typeof obj[key] === "object") {
            obj[key] = this.convertObjectIds(obj[key]);
          }
        }
      }
      return obj;
    }

    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(response);
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}

export default MongooseClassSerializerInterceptor;

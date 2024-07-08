import { Module } from "@nestjs/common";
import { FormsService } from "./forms.service";
import { FormsController } from "./forms.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Form, FormSchema } from "./schemas/form.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}

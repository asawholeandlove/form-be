import { Module } from "@nestjs/common";
import { SubmissionsService } from "./submissions.service";
import { SubmissionsController } from "./submissions.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Submission, SubmissionSchema } from "./schemas/submission.schema";
import { Form, FormSchema } from "src/forms/schemas/form.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Submission.name, schema: SubmissionSchema },
      { name: Form.name, schema: FormSchema },
    ]),
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}

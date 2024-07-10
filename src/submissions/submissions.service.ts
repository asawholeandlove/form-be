import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Submission } from "./schemas/submission.schema";
import { Model } from "mongoose";
import { Form } from "src/forms/schemas/form.schema";
import { omit } from "lodash";

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
    @InjectModel(Form.name) private formModel: Model<Form>,
  ) {}

  async create(createSubmissionDto: CreateSubmissionDto) {
    const { form, answers: answersOri } = createSubmissionDto;

    const formExist = await this.formModel.findById(form);
    const formObj = formExist.toObject();

    // modify answers to include field details
    createSubmissionDto.answers = answersOri.map((answer) => {
      const field = formObj.fields.find(
        (f) => (f as any)._id == answer.fieldId,
      );
      if (!field) {
        throw new BadRequestException(
          `Field with id ${answer.fieldId} not found`,
        );
      }
      const ommittedField = omit(field, ["id", "_id", "__v"]);
      return { ...ommittedField, ...answer };
    });

    const { answers: answersModified } = createSubmissionDto;

    // validate required fields
    formObj.fields.forEach((field) => {
      const { required, label } = field;
      const answer = answersModified.find(
        (a) => a.fieldId === (field as any)._id.toString(),
      );
      if (required && !answer) {
        throw new BadRequestException(
          `Field '${label}' with id=${(field as any)._id} is required`,
        );
      }
    });

    const createdSubmission = new this.submissionModel(createSubmissionDto);
    const result = await createdSubmission.save();
    return {
      ...result.toObject(),
      form: formObj,
    };
  }

  findAll() {
    return `This action returns all submissions`;
  }

  async findOne(id: string) {
    return await this.submissionModel.findById(id).populate("form");
  }

  update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    return `This action updates a #${id} submission`;
  }

  remove(id: string) {
    return `This action removes a #${id} submission`;
  }
}

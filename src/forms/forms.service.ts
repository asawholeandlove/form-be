import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateFormDto } from "./dto/create-form.dto";
import { UpdateFormDto } from "./dto/update-form.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Form } from "./schemas/form.schema";
import { Model } from "mongoose";
import { handleFilter } from "src/utils/filters.util";

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

  async checkFormExist(title: string) {
    const isExist = await this.formModel.findOne({ title });
    if (isExist) {
      throw new BadRequestException(`Form with title ${title} already exists`);
    }
  }

  async create(createFormDto: CreateFormDto) {
    const { title } = createFormDto;
    await this.checkFormExist(title);

    const createdForm = new this.formModel(createFormDto);
    return createdForm.save();
  }

  findAll(query: any) {
    return handleFilter(this.formModel.find(), query);
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  async update(id: number, updateFormDto: UpdateFormDto) {
    const { title } = updateFormDto;
    await this.checkFormExist(title);
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}

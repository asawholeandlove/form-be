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

  async findById(id: string) {
    const form = await this.formModel.findById(id).populate("createdBy");

    if (!form) {
      throw new BadRequestException(`Form with id ${id} not found`);
    }

    return form;
  }

  async create(createFormDto: CreateFormDto, user: any) {
    const { title } = createFormDto;
    await this.checkFormExist(title);

    const createdForm = new this.formModel({
      ...createFormDto,
      createdBy: user,
    });
    return createdForm.save();
  }

  findAll(query: any) {
    return handleFilter(this.formModel.find().populate("createdBy"), query);
  }

  async findOne(id: string) {
    const form = await this.findById(id);
    return form;
    return {
      ...form.toObject(),
      createdById: (form.createdBy as any)._id,
      createdByUsername: form.createdBy.username,
    };
  }

  async update(id: string, updateFormDto: UpdateFormDto) {
    const found = await this.findById(id);
    const { title } = updateFormDto;

    if (title !== found.title) {
      await this.checkFormExist(title);
    }
    return this.formModel.updateOne(
      {
        _id: id,
      },
      updateFormDto,
    );
  }

  async remove(id: string) {
    await this.findById(id);
    return this.formModel.deleteOne({
      _id: id,
    });
  }
}

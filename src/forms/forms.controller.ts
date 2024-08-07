import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { FormsService } from "./forms.service";
import { CreateFormDto } from "./dto/create-form.dto";
import { UpdateFormDto } from "./dto/update-form.dto";
import { Public, User } from "src/decorators/customises";
import MongooseClassSerializerInterceptor from "src/cores/mongooseClassSerializer.interceptor";
import { Form } from "./schemas/form.schema";

@Controller("forms")
// @UseInterceptors(MongooseClassSerializerInterceptor(Form))
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto, @User() user: any) {
    return this.formsService.create(createFormDto, user);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.formsService.findAll(query);
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.formsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(id, updateFormDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.formsService.remove(id);
  }
}

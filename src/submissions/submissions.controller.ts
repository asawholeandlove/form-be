import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubmissionsService } from "./submissions.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { Public } from "src/decorators/customises";

@Controller("submissions")
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Public()
  @Post()
  create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionsService.create(createSubmissionDto);
  }

  @Get()
  findAll() {
    return this.submissionsService.findAll();
  }

  @Get("byForm/:id")
  findByFormId(@Param("id") id: string) {
    return this.submissionsService.findByFormId(id);
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.submissionsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.submissionsService.remove(id);
  }
}

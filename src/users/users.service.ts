import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { omit } from "lodash";
import { getHashPassword } from "src/utils/auths.util";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const isExist = await this.userModel.findOne({ username });
    if (isExist) {
      throw new BadRequestException(
        `Username: ${username} đã tồn tại trên hệ thống. Vui lòng sử dụng username khác.`,
      );
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      password: getHashPassword(createUserDto.password),
    });
    return createdUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  findByUsername(username: string) {
    return this.userModel.findOne({
      username,
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const omittedUser = omit(updateUserDto, ["password", "username"]);
    return this.userModel.updateOne({ _id: id }, omittedUser);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { omit } from "lodash";
import { getHashPassword } from "src/utils/auths.util";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const code = this.configService.get("REGISTER_CODE") || "hive";
    if (createUserDto.code !== code) {
      throw new BadRequestException(
        `Mã code không hợp lệ. Vui lòng kiểm tra lại.`,
      );
    }
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
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByUsername(username: string) {
    return this.userModel.findOne({
      username,
    });
  }

  findByRefreshToken(refreshToken: string) {
    return this.userModel.findOne({
      refreshToken,
    });
  }

  updateRefreshToken(username: string, refreshToken: string) {
    return this.userModel.updateOne({ username }, { refreshToken });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const omittedUser = omit(updateUserDto, ["password", "username"]);
    return this.userModel.updateOne({ _id: id }, omittedUser);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

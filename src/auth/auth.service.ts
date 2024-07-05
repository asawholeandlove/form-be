import { Injectable } from "@nestjs/common";
import { compareSync } from "bcryptjs";
import { omit } from "lodash";
import { UsersService } from "src/users/users.service";
import { getHashPassword } from "src/utils/auths.util";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    const hashedPassword = user.password;

    if (user && compareSync(password, hashedPassword)) {
      const omittedUser = omit(user, ["password"]);
      return omittedUser;
    }
    return null;
  }
}

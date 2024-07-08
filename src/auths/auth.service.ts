import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcryptjs";
import { Response } from "express";
import { omit } from "lodash";
import ms from "ms";
import { UsersService } from "src/users/users.service";
import { TUser } from "src/users/users.types";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    const hashedPassword = user?.password;

    if (user && compareSync(password, hashedPassword)) {
      const omittedUser = omit(user, ["password"]);
      return omittedUser;
    }
    return null;
  }

  createToken(type: "access" | "refresh", user: any) {
    const { username } = user;

    const payload = { sub: `${type} token`, username };
    const token = this.jwtService.sign(payload, {
      secret:
        type === "access"
          ? this.configService.get("ACCESS_TOKEN_SECRET")
          : this.configService.get("REFRESH_TOKEN_SECRET"),

      expiresIn:
        type === "access"
          ? this.configService.get("ACCESS_TOKEN_LIFE")
          : this.configService.get("REFRESH_TOKEN_LIFE"),
    });

    return token;
  }

  async processToken(user: TUser, response: Response) {
    const { username } = user;

    const accessToken = this.createToken("access", user);
    const refreshToken = this.createToken("refresh", user);

    await this.userService.updateRefreshToken(username, refreshToken);

    response.clearCookie("refreshToken");

    // Set the refresh token in the cookie
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>("REFRESH_TOKEN_LIFE")),
    });

    return {
      user,
      accessToken,
    };
  }

  async login(user: TUser, response: Response) {
    return await this.processToken(user, response);
  }

  async refreshToken(refreshToken: string, response: Response) {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
      });

      const user = await this.userService.findByRefreshToken(refreshToken);

      if (!user) {
        throw new BadRequestException("Refresh token không hợp lệ");
      }
      return await this.processToken(user, response);
    } catch (error) {
      throw new BadRequestException("Refresh token không hợp lệ");
    }
  }
}

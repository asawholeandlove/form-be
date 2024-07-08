import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public, ResponseMessage, User } from "src/decorators/customises";
import { Request, Response } from "express";
import { TUser } from "src/users/users.types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post("login")
  @ResponseMessage("Đăng nhập thành công")
  login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Get("info")
  @ResponseMessage("Thông tin người dùng")
  info(@User() user: TUser) {
    return user;
  }

  @Public()
  @Get("refresh-token")
  refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = req.cookies["refreshToken"];
    return this.authService.refreshToken(refreshToken, response);
  }

  @Post("register")
  register() {
    return "User registered successfully!";
  }
}

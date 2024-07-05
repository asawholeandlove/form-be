import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public, User } from "src/decorators/customises";
import { Response } from "express";
import { TUser } from "src/users/users.types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post("login")
  login(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Get("info")
  info(@User() user: TUser) {
    return {
      data: user,
    };
  }

  @Post("register")
  register() {
    return "User registered successfully!";
  }
}

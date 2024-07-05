import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Request() req) {
    return req.user;
  }

  @Get("info")
  info() {
    return {
      data: {
        name: "John Doe",
        email: "master@gmail.com",
      },
    };
  }

  @Post("register")
  register() {
    return "User registered successfully!";
  }
}

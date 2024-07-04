import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login() {
    return {
      data: {
        token: "abc123",
      },
      message: "User logged in successfully!",
      statusCode: 201,
    };
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

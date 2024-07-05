import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./passports/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./passports/jwt.strategy";

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}

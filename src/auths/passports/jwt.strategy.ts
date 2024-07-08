import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as JwtPassportStrategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtPassportStrategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: any) {
    // it will bind to request.user
    const { username } = payload;
    return { username };
  }
}

import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "src/decorators/customises";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context, status) {
    const msg: string = info?.message || "";

    if (msg === "No auth token") {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Token is required",
        errorCode: "TOKEN_REQUIRED",
      });
    }

    if (err || !user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: "Token is invalid or expired",
        errorCode: "INVALID_TOKEN",
      });
    }
    return user;
  }
}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auths/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { FormsModule } from "./forms/forms.module";
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.development"],
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      "mongodb+srv://admin:12345@twitter.ihoxoie.mongodb.net/form",
    ),
    AuthModule,
    UsersModule,
    FormsModule,
    SubmissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

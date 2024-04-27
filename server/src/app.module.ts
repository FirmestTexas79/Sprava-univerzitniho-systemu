import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { DevtoolsModule } from "@nestjs/devtools-integration";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailModule } from "./email/email.module";
import { AuthTokenModule } from "./auth-token/auth-token.module";
import { ActivityModule } from "./activity/activity.module";
import { SubjectModule } from "./subject/subject.module";
import { ExamModule } from "./exam/exam.module";
import { RoomModule } from "./room/room.module";
import { RatingModule } from "./rating/rating.module";
import { ScheduleModule } from "./schedule/schedule.module";
import { AppService } from "./app.service";
import { FieldOfStudyModule } from './field-of-study/field-of-study.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DevtoolsModule.register({ http: process.env.NODE_ENV !== "production" }),
    UserModule,
    AuthModule,
    PrismaModule,
    EmailModule,
    AuthTokenModule,
    ActivityModule,
    SubjectModule,
    ExamModule,
    RoomModule,
    RatingModule,
    ScheduleModule,
    FieldOfStudyModule,
  ],
  providers: [AppService],
})
export class AppModule {}

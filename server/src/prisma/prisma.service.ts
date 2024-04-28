import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get("DATABASE_URL"),
        },
      },
    });
  }

  async cleanDatabase() {
    return this.$transaction([
      this.user.deleteMany(),
      this.activity.deleteMany(),
      this.room.deleteMany(),
      this.rating.deleteMany(),
      this.exam.deleteMany(),
      this.subject.deleteMany(),
      this.schedule.deleteMany(),
      this.authToken.deleteMany(),
      this.fieldOfStudy.deleteMany(),
    ]);
  }
}

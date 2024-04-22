import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Main")
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  redirectToSwagger(@Res() res: Response): void {
    return this.appService.redirectToSwagger(res);
  }

  @Get("/api")
  redirectToAPISwagger(@Res() res: Response): void {
    this.appService.redirectToSwagger(res);
  }
}

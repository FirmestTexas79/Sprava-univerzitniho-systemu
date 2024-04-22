import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class AppService {
  /**
   * Redirects to the Swagger UI.
   * @param res The response object.
   * @returns The redirect response.
   */
  redirectToSwagger(res: Response): void {
    return res.redirect("/api/v1");
  }
}

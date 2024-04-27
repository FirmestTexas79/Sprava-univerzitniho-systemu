import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Response } from "express";
import { ResponseData } from "./utils/response-data";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();

    const responseObj: ResponseData<object | string> = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      error: "Internal server error",
      data: null,
    };

    if (exception instanceof HttpException) {
      responseObj.statusCode = exception.getStatus();
      responseObj.data = exception.getResponse();
      responseObj.error = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      responseObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      responseObj.error = exception.message.replaceAll("\n", " ");
    } else {
      responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseObj.error = "Internal server error";
    }

    response.status(responseObj.statusCode).json(responseObj);

    this.logger.error(responseObj.message, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}

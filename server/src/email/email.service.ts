import { Injectable, Logger } from "@nestjs/common";
import { createTransport, SentMessageInfo } from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { Options } from "nodemailer/lib/mailer";

@Injectable()
export class EmailService {
  constructor(
    private config: ConfigService,
    private logger: Logger = new Logger(EmailService.name),
  ) {
  }

  /**
   * Send an email
   * @param options The email options
   */
  send(options: Options): Promise<SentMessageInfo> {
    return new Promise((resolve, reject) => {
      const transporter = createTransport({
        service: "gmail",
        auth: {
          user: this.config.get("EMAIL"),
          pass: this.config.get("EMAIL_PASSWORD"),
        },
      });

      transporter.sendMail({
        ...options,
        from: this.config.get("EMAIL") || options.from,
      }, (error, info) => {
        if (error) {
          this.logger.error(error);
          reject(error);
        } else {
          this.logger.log(info);
          resolve(info);
        }
      });
    });
  }
}

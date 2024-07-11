import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(emailParams: any) {
    const sesClient = new SESClient({
      region: this.configService.get('AWS_SES_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_SES_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SES_SECRET_KEY'),
      },
    });

    const loadTemplate = () => {
      const templatePath = path.join(
        __dirname,
        'templates',
        emailParams.template,
      );

      const templateSource = fs.readFileSync(templatePath, 'utf8');

      return Handlebars.compile(templateSource)(emailParams.variables);
    };

    const params = {
      Source: emailParams.sender,
      Destination: {
        ToAddresses: [emailParams.to],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: emailParams.subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: loadTemplate(),
          },
        },
      },
    };

    await sesClient.send(new SendEmailCommand(params));
  }
}

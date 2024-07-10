import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Mailer {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(emailParams: any) {
    const sesClient = new SESClient({
      region: this.configService.get('AWS_SES_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_SES_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SES_SECRET_KEY'),
      },
    });

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
          // Html: {
          //   Charset: "UTF-8",
          //   Data: loadTemplate()
          // }
          Text: {
            Data: `Hello ${emailParams.name}, welcome to our service! - ${this.configService.get('ENVIRONMENT')}`,
          },
        },
      },
    };

    await sesClient.send(new SendEmailCommand(params));
  }
}

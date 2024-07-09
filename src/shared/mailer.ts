import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Mailer {
  async sendEmail(emailParams: any) {
    const sesClient = new SESClient({
      region: 'sa-east-1',
      credentials: {
        accessKeyId: 'AKIA47CR2MQLK4LJNSIZ',
        secretAccessKey: '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',
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
            Data: `Hello ${emailParams.name}, welcome to our service!`,
          },
        },
      },
    };

    await sesClient.send(new SendEmailCommand(params));
  }
}

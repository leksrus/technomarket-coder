import { MailSenderPort } from '@core/domain/ports/mailer/mail-sender.port';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class MailSenderAdapter implements MailSenderPort {
  private readonly _mailUser: string;
  private readonly _mailPassword: string;

  public constructor(private readonly _configService: ConfigService) {
    this._mailUser = this._configService.get<string>('MAILUSER');
    this._mailPassword = this._configService.get<string>('MAILUSER');
  }

  public async sendEmail(subject: string, htmlMessage: string): Promise<void> {
    const transporter: Transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: this._mailUser,
        pass: this._mailPassword,
      },
    });

    await transporter.sendMail({
      from: 'Site Admin',
      to: this._mailUser,
      subject: subject,
      html: htmlMessage,
    });
  }
}

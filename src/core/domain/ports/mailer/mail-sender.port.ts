

export interface MailSenderPort {
  sendEmail(subject: string, htmlMessage: string): Promise<void>;
}
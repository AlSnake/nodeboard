import nodemailer from 'nodemailer';
import { MailConfig } from '../../../config/mail';

export class EmailService {
	private static mailTransporter = nodemailer.createTransport(
		MailConfig.smtp
	);

	static async send(from: string, to: string, subject: string, body: string) {
		return this.mailTransporter.sendMail({ from, to, subject, html: body });
	}
}

import SMTPConnection from 'nodemailer/lib/smtp-connection';
import { Config } from './Config';

export const MailConfig: {
	smtp: SMTPConnection.Options;
	api: { api_url: any; api_user: any; api_key: any };
	general: { noreply_email: any };
} = {
	smtp: {
		host: Config.get('SMTP_HOST'),
		port: parseInt(Config.get('SMTP_PORT') || '0'),
		auth: {
			user: Config.get('SMTP_USER'),
			pass: Config.get('SMTP_PASS'),
		},
	},
	api: {
		api_url: Config.get('MAIL_API_URL'),
		api_user: Config.get('MAIL_API_USER'),
		api_key: Config.get('MAIL_API_KEY'),
	},
	general: {
		noreply_email: Config.get('NOREPLY_EMAIL'),
	},
};

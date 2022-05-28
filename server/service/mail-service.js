const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  from: process.env.SMTP_USER,
});

class MailService {
  async sendMail(to, link) {
    await transporter.sendMail({
      to,
      subject: 'Activate your account',
      text: '',
      html: `<a href=http://localhost:${process.env.SERVER_PORT}/api/activate/${link}>${link}</a>`,
    });
  }
}

module.exports = new MailService();

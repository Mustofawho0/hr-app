import nodemailer from 'nodemailer';

export const TransporterNodemailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mustofa.uyee@gmail.com',
    pass: 'uassbffievscekqn',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

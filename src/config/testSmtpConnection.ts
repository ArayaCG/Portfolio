import nodemailer, { SentMessageInfo } from 'nodemailer';

// Configura tus credenciales de Gmail
const userGmail: string = 'arayag64@gmail.com';
const passAppGmail: string = 'exii chgb hhue vgrf';

// Configura el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

// Configura las opciones del correo
const mailOptions = {
  from: userGmail,
  to: userGmail,
  subject: 'Test Email 222',
  text: 'This is a test email from Node.js!',
};

// Envía el correo
transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

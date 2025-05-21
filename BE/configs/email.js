const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, html) => {
  let fromEmail = process.env.EMAIL_FROM;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: fromEmail,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;

const nodeMailer = require("nodemailer");

exports.sendMail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

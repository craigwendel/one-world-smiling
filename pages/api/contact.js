require('dotenv').config();
const nodemailer = require('nodemailer');

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_AUTH,
    },
    secure: true,
  });
  const { firstName, lastName, phone, email, message } = req.body;
  const mailData = {
    from: email,
    to: 'wendelcraig@gmail.com, 1worldsmiling@gmail.com',
    subject: `New Message From ${firstName} ${lastName}`,
    text: `${message} | Sent from: ${email}`,
    html: `<h4>Email: ${email}</h4>
    <h4>Phone: ${phone}</h4>
    <p><b>Message:</b> ${message}</p>
    `,
  };
  try {
    await transporter.sendMail(mailData);
    res.status(200).send(`Thanks for your submission! We'll be in touch soon!`);
  } catch (error) {
    console.log('ERROR', error);
    res
      .status(400)
      .send(
        `There was a problem with your request, please try again later. Error: ${error}`
      );
  }
}

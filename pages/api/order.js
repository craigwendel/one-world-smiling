require('dotenv').config();
const nodemailer = require('nodemailer');
import formatMoney from '../../lib/formatMoney';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.ONE_WORLD_EMAIL,
      pass: process.env.ONE_WORLD_AUTH,
    },
    secure: true,
  });
  const { firstName, lastName, phone, email } = req.body.details;
  const { orderNumber, cartItems, total } = req.body;
  const mailData = {
    from: 'orders.1worldsmiling@gmail.com',
    to: email,
    subject: `Your Order Confirmation | 1 World Smiling`,
    text: `Order #${orderNumber}`,
    html: `<h3>Thanks again ${firstName} for your order!</h3>
    <h2>Your Order #${orderNumber}</h2>
    <h4>Your Order details:</h4>
    <ul>${cartItems.map(
      (item) =>
        `<li>${item.quantity} x ${item.color} ${
          item.name
        } - Size: ${item.size.toUpperCase()}`
    )}
    </ul>
    <h3>Total: ${formatMoney(total + 4.95)}</h3>
    <p>Our team is notificed of your order and will be reaching out shortly to explain the next steps in the order process.  If you have any questions in the meantime, feel free to email us a <a>1worldsmiling@gmail.com</a> and we'll be happy to assist!</p>
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

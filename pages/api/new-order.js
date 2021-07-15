require('dotenv').config();
const nodemailer = require('nodemailer');

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
  const {
    firstName,
    lastName,
    phone,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    country,
  } = req.body.details;
  const { orderNumber, cartItems, total } = req.body;
  const mailData = {
    from: 'orders.1worldsmiling@gmail.com',
    to: 'wendelcraig@gmail.com',
    subject: `New Order from ${firstName} ${lastName} | Order #${orderNumber}`,
    text: `Order #${orderNumber}`,
    html: `<h3>Contact Details:</h3>
    <h4>${firstName} ${lastName}</h4>
    <h4>${email}</h4>
    <h4>${phone}</h4>

    <h2>Order #${orderNumber}</h2>
    <h4>Order details:</h4>
    <ul>${cartItems.map(
      (item) =>
        `<li>${item.quantity} x ${item.color} ${
          item.name
        } - Size: ${item.size.toUpperCase()}`
    )}
    </ul>
    <h3>Total: $${total + 4.99}</h3>

    <h3>Shipping details:</h3>
    <p>${firstName} ${lastName}</p>
    <p>${address1}</p>
    <p>${address2}</p>
    <p>${city}, ${state}  ${zip},  ${country}</p>
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

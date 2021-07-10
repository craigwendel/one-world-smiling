require('dotenv').config();
const sgMail = require('@sendgrid/mail');

export default async function (req, res) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { firstName, lastName, phone, email, message, tshirts, order } =
    req.body;

  const content = {
    to: 'wendelcraig@gmail.com',
    from: 'wendelcraig@gmail.com',
    subject: `New ${
      order ? 'Order' : 'Message'
    } From - ${firstName} ${lastName}`,
    text: 'See Details below...',
    html: `
    <p> ${order ? 'Order' : 'Message'} from <b>${firstName} ${lastName}</b></p>
    <p>Email: ${email}</p>
    <p>Phone: ${phone}</p>
    <p>${
      order
        ? `T-Shirts requested: <ul>${tshirts?.map(
            (t) => `<li>Size: ${t?.size} - Quantity: ${t?.quantity}</li>`
          )}</ul>`
        : `Message: ${message}`
    }</p>
    `,
  };

  try {
    await sgMail.send(content);
    res.status(200).send(`Thanks for your submission! We'll be in touch soon!`);
  } catch (error) {
    console.log('ERROR', error);
    res
      .status(400)
      .send('There was a problem with your request, please try again later');
  }
}

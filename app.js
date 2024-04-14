const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb',  extended: true }));
app.use(express.urlencoded({ limit: '25mb',  extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

function sendEmail(email, subject, message) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "karleenmsrichards@gmail.com",
        pass: process.env.USER_PASSWORD,
      },
    });

    var mailOptions = {
      from: email,
      to: 'karleenmsrichards@gmail.com',
      subject: subject,
      text: message,
  };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: 'An error occurred' });
      }

      return resolve({ message: 'Email sent successfully' });
    });
  });
}

app.get('/send_email', (req, res) => {
  const { email, subject, message } = req.query;
  const subjectWithEmail = `Email: ${email} - Subject: ${subject}`;
  sendEmail(email, subjectWithEmail, message)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(PORT, () => {
  console.log(`Nodemailer is listening on ${PORT}`);
});

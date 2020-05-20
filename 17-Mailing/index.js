// index.js

const nodemailer = require("nodemailer");

const createTransport = ({ host, port, secure, user, pass}) => {
  console.log(`Creating Transport with options: host: ${host}, port: ${port}, secure: ${secure}, user: ${user}, pass: ${pass}`);

  const options = { host, port, secure }
  // The user and pass can not be passed as blank if not required.
  if (user) {
    options.user = user;
  }
  if (pass) {
    options.pass = pass;
  }

  console.log(`Inner mail options passed to nodemailer: ${JSON.stringify(options)}`);
  const transporter = nodemailer.createTransport(options);
  console.log('Transport created OK!');
  return transporter;
}

const sendMail = async ({ transporter, from, to, subject, text }) => {
  console.log(`Sending mail with options: from: ${from}, to: ${to}, subject: ${subject}, text: ${text}`);
  await transporter.sendMail({ from, to, subject, text });
}

const mailTransportOptions = {
  host: 'localhost',
  port: 1025,
  secure: false,
  user: 'a',
  pass: 'b',
};

const mailTransportOptionsAlt = {
  host: 'localhost',
  port: 1025,
  secure: false,
}

const mailOptions = {
  from: '"Test Sender 👻" <testsender@mail.com>',
  to: 'testreceiver@mail.com',
  subject: 'mail test',
  text: 'this is a mail test',
}

console.log('Execution with user and pass...');

// Execution with user and pass
const transporter = createTransport(mailTransportOptions);
mailOptions.transporter = transporter;

sendMail(mailOptions)
  .then((result) => {
    console.log(`--> Message sent with user and pass OK!\n`);
    return true;
  })
  .then(() => {
    console.log('--> Execution without user and pass...(they can not be passed in blank)');
    // Execution without user and pass
    const transporter = createTransport(mailTransportOptionsAlt);
    mailOptions.transporter = transporter;
    return sendMail(mailOptions);
  })
  .then((result) => {
    console.log(`--> message sent without user and pass OK!`);
    return true;
  })
  .catch((error) => {
    console.error(error.stack);
  })
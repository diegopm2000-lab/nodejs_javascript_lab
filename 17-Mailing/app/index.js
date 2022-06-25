// index.js

const nodemailer = require("nodemailer");

const createTransport = () => {

  const host = process.env.MAIL_HOST;
  const port = process.env.MAIL_PORT;
  const secure = (process.env.MAIL_SECURE === 'true');
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  console.log(`createTransport (IN)  --> env params: host: ${host}, port: ${port}, secure: ${secure}, user: ${user}, pass: ${pass}`);

  const options = { host, port, secure }
  // The user and pass can not be passed as blank if not required.
  let auth;
  if (user && pass) {
    auth = { user, pass }
    options.auth = auth;
  }

  console.log(`createTransport (MID) --> creating transport with options: ${JSON.stringify(options)}`);
  const transporter = nodemailer.createTransport(options);
  console.log('createTarnsport (MID) --> Transport created OK!');

  console.log('createTransport (OUT) --> <<transporter>>\n');
  return transporter;
}

const sendMail = async (transporter) => {

  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;
  const subject = process.env.MAIL_SUBJECT;
  const text = process.env.MAIL_TEXT;

  console.log(`sendMail (IN)  --> env params: from: ${from}, to: ${to}, subject: ${subject}, text: ${text}`);

  console.log('sendMail (MID) --> sending mail...');
  const result = await transporter.sendMail({ from, to, subject, text });
  console.log('sendMail (MID) --> mail sent OK!');

  console.log(`sendMail (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
}

// Main Execution

console.log('App (IN) --> Init\n')
const transporter = createTransport();

sendMail(transporter)
  .then((result) => {
    return true;
  })
  .catch((error) => {
    console.error(error.stack);
    return false;
  })
  .finally(() => {
    console.log('App (OUT)');
  });
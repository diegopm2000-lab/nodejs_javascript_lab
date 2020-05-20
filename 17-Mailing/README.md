# Sending mail using nodemailer

This is a mail sending test using the npm module nodemailer and mailhog as smtp test server 

### 1. Installation

```shell
$ npm i
```

### 2. Execution

first, start the mailhog docker smtp server

```shell
$ docker-compose up -d
```

then, execute the application

```shell
$ npm run start

> mailing@1.0.0 start /home/diego/workdir/proyectos-GitHub/laboratories/nodejs_lab/17-Mailing
> node index.js

Creating Transport with options: host: localhost, port: 1025, secure: false, user: myuser, pass: mypass
Transport created OK!
Sending mail with options: from: "Test Sender 👻" <testsender@mail.com>, to: testreceiver@mail.com, subject: mail test, text: this is a mail test
--> message sent OK!
```
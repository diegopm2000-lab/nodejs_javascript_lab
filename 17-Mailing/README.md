# Sending mail using nodemailer

This is a mail sending test using the npm module nodemailer and mailhog as smtp test server 

## 1. Installation

```shell
$ npm i
```

## 2. Execution in local environment

The application will send an email to smtp server configured by environment variables.

### 2.1 Start the mailhog docker smtp server

Execute:

```shell
$ docker-compose up -d
```

### 2.2 Set the environment variables

Execute:

```shell
$ source ./init.sh
```
### 2.3 Execute the application

```shell
$ npm run start

> mailing@1.0.0 start /home/diego/workdir/proyectos-GitHub/laboratories/nodejs_lab/17-Mailing
> node index.js

Creating Transport with options: host: localhost, port: 1025, secure: false, user: myuser, pass: mypass
Transport created OK!
Sending mail with options: from: "Test Sender 👻" <testsender@mail.com>, to: testreceiver@mail.com, subject: mail test, text: this is a mail test
--> message sent OK!
```

## 3. Execution in docker environment

### 3.1 Set the environment variables

Set the environment variables in nodejs container related with the host, port, secure, user and password.

### 3.2 Execute the application

```shell
$ docker-compose up
```
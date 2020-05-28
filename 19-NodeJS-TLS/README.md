# NodeJS TLS Example

Example of TLS using a tls-server and tls-client

### 1. Build our private key

First, we need to generate the private key

```shell
$ openssl genrsa -out private-key.pem 1024

Generating RSA private key, 1024 bit long modulus (2 primes)
...................................+++++
............+++++
e is 65537 (0x010001)
```

this generates the next file: __private-key.pem__ using RSA with 1024 bit long modulus (2 primes).

Basically, it's a set of random noise that's used to encrypt information.

## 2. Generate the CSR (Certificate signing request)

Once we have our private key, we can create a CSR (certificate signing request), which is our request to have the private key signed by a fancy authority. That is why you have to input information related to your company. This information will be seen by the signing authority, and used to verify you. In our case, it doesn’t matter what you type, since in the next step we're going to sign our certificate ourselves.

```shell
$ openssl req -new -key private-key.pem -out csr.pem

You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:server-tls
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
```

IMPORTANT: Note that in Common Name section, we put __server-tls__ (running in docker using server-tls as service name) or __localhost__ (running with npm in our local environment) as server FQDN 

this will create the private-key.pem

## 3. Create the public key

Now that we have our paper work filled out, it's time to pretend that we're a cool signing authority.
We will need the __csr.pem__ and __private-key.pem__ previously generated. In this process, we will create our public key
and sign the csr.pem with our private key generated previously.

```shell
$ openssl x509 -req -in csr.pem -signkey private-key.pem -out public-cert.pem

Signature ok
subject=C = AU, ST = Some-State, O = Internet Widgits Pty Ltd
Getting Private key
```

This will create the public key in the file: public-cert.pem

## 4. Our application

Our application have two containers:

- server-tls
- client-tls

The server-tls needs to contain the private-key and public-key mounted and the client only needs the public-key.

## 5 .Executing all locally

### 5.1 Run the server

go to server folder and execute:

```shell
$ source ./init.sh
$ npm run start

---> TLS server created and listening at port : 8443
```

### 5.2 Run the client

go to client folder and execute:

```shell
$ source ./init.sh
$ npm run start

--> hostname: localhost, port: 8443
client connected authorized
.-..-..-.  .-.   .-. .--. .---. .-.   .---. .-.
: :; :: :  : :.-.: :: ,. :: .; :: :   : .  :: :
:    :: :  : :: :: :: :: ::   .': :   : :: :: :
: :: :: :  : `' `' ;: :; :: :.`.: :__ : :; ::_;
:_;:_;:_;   `.,`.,' `.__.':_;:_;:___.':___.':_;
```

And viewing the log in the server, you have obtained:

```shell

server connected unauthorized
```

## 6 .Executing all in docker

### 6.1 Run the server

Go to root folder and execute:

```shell
$ docker-compose up -d server-tls
```

### 6.2 Run the client

Go to root folder and execute:

```shell
$ docker-compoes up client-tls
```

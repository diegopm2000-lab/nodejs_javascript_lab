# NodeJS Library

Implementation of a custom nodeJS Library to be used in a project within a package.json descriptor

## 1. Library description

The library greetingslibrary has only one public function: greet, that receives one parameter (name), and prints in the console.log a greeting message.

## 2. Installation of the library

I have installed the library in my personal Github at this path: diegopm2000-boilerplate/greetingslibrary

## 3. Getting the library in our test program

We add the library in our dependencies:

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "greetingslibrary": "https://github.com/diegopm2000-boilerplate/greetingslibrary.git"
  },
  "author": "Diego Perez Molinero",
  "license": "ISC"
}
```

# 4. Test program

In index.js I have implemented a mini program test

```javascript
// index.js

const greetingslibrary = require('greetingslibrary');

greetingslibrary.greet('Arnold Schwarzenegger');
```

## 5. Install de library in our test program

Execute this to download the library from github

```shell
$ npm i
```

This will download the library to our node_modules folder

## 6. Run the test program

Execute

```shell
$ node index.js
Hello Arnold Schwarzenegger. How are you?
```

## 7. More info

https://stackoverflow.com/questions/23210437/npm-install-private-github-repositories-by-dependency-in-package-json

https://medium.com/@anlijudavid/pasos-para-crear-una-librer%C3%ADa-para-nodejs-fa49b17558b8


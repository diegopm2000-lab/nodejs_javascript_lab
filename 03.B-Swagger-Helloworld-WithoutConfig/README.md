# Swagger Hello World - Without config

Hello World using the Swagger tool 

It is the same example of 03.B-Swagger-Helloworld without default.yaml file in config folder. This file is not necesary in 0.7.0 version of swagger-node-mw

## 1. Creation of the project from scratch

If you want to start from this repo cloned, go to step 2. 
If you want to create a new swagger project form scratch, continue in 1.1 step.

### 1.1 Install Swagger globally

Install Swagger tool globally executing:

```shell
$ npm install -g swagger
```

### 1.2 Create project

Create a new project and choose Express

```shell
$ swagger project create hello-world
```

### 1.3 Open editor

Open editor to view the api with

```shell
$ swagger project edit
```

### 1.4 Fix the swagger-express-mw version

Change version to 0.7.0 in package.json. Swagger initially uses 0.1.0 and the program will crash in the beginning.

### 1.5 Delete the default.yaml file

In the 0.7.0 version of swagger-node-mw this file is not necessary.

## 2. Test the application

### 2.1. Start the application

Execute this to start the application

```shell
$ swagger project start
```

### 2.2. Use curl to test the application

```shell
$ curl http://127.0.0.1:10010/hello?name=Scott
Hello, Scott!
```

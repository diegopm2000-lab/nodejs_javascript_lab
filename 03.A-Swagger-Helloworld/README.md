# Swagger Hello World

Hello World using the Swagger tool 

https://www.npmjs.com/package/swagger

NOTE: First, we need to fix some issues before the application runs ok. Follow carefully the steps 4 and 5 for this.

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

### 1.5. Add params parser to config

We need to add in config/default.yaml the swagger_params_parser

```yaml
# pipe for all swagger-node controllers
  swagger_controllers:
    - onError: json_error_handler
    - cors
    - swagger_params_parser
    - swagger_security
    - _swagger_validate
    - express_compatibility
    - _router
```

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

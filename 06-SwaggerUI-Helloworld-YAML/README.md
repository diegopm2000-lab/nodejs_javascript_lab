# Swagger-UI Helloworld

Swagger-UI Helloworld (using a REST API descriptor file in YAML format).

We will use the yamljs npm library to load swagger.yaml file into swaggerDocument and then will pass it to swagger-ui

### 1. Install the dependencies

```shell
$ npm i
```

### 2. Start the Express Server

```shell
$ npm run start
```
### 3. Check using curl

```shell
$ curl http://localhost:3000
Hello World Swagger UI - Try to http://localhost:3000/api.docs to view the API DOCUMENTATION using Swagger-UI!
```

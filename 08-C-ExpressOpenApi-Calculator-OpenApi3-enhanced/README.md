# Express OpenApi Calculator - Enhaced Version

Express OpenApi Calculator in Open Api v3.

NOTE: This is an alternative version with these changes applied:

- logger.js module extracted
- operations moved to calculator.controller.js
- swagger-ui added to document and test the api

### 1. Install the dependencies

```shell
$ npm i
```

### 2. Start the Express Server

```shell
$ npm run start
```

### 3. Check the OAS 3 Documentation and test the app

use this endpoint in your browser:

http://localhost:3000/api-docs

### 4. Check using curl

Add

```shell
$ curl -X GET -G http://localhost:3000/api/calculator/add -d 'a=3' -d 'b=5'
{ "result": 8 }
```

Substract

```shell
$ curl -X GET -G http://localhost:3000/api/calculator/substract -d 'a=3' -d 'b=5'
{ "result": -3 }
```

Multiplication

```shell
$ curl -X GET -G http://localhost:3000/api/calculator/multiply -d 'a=3' -d 'b=5'
{ "result": 15 }
```

Division

```shell
$ curl -X GET -G http://localhost:3000/api/calculator/divide -d 'a=10' -d 'b=5'
{ "result": 2 }
```

Division by zero

```shell
$ curl -X GET -G http://localhost:3000/api/calculator/divide -d 'a=10' -d 'b=0'
{
  "status": 400,
  "message": "Division by zero not allowed"
}
```

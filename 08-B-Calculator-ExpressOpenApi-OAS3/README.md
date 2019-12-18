# Express OpenApi Calculator

Express OpenApi Calculator in Open Api v3 (OAS 3).

NOTE: I used this converter to pass swagger.yml from open api v2 (aka swagger 2) to open api v3:

https://mermade.org.uk/openapi-converter

### 1. Install the dependencies

```shell
$ npm i
```

### 2. Start the Express Server

```shell
$ npm run start
```
### 3. Check using curl

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

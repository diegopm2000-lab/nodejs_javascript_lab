# CRUD in NodeJS minimal (database mocked & internal arch less)

Using Express as http framework.

Note: We need to use the body-parser to extract the body for POST & PUT requests

## 1. Install

```shell
npm install
```

## 2. Test the application

Get all cars:

```shell
curl --request GET http://localhost:3000/cars -i
```

Get car by id

```shell
curl --request GET http://localhost:3000/cars/1 -i
```

Create a new car

```shell
curl --request POST http://localhost:3000/cars --header "Content-Type: application/json" --data-raw '{"brand":"Opel", "car":"Astra"}' -i
```

Update a car

```shell
curl --request PUT http://localhost:3000/cars/5 --header "Content-Type: application/json" --data-raw '{"id": 5, "brand":"Ford","car":"Focus"}' -i
```

Delete a car


```shell
curl --request DELETE http://localhost:3000/cars/5 -i
```
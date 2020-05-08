# Swagger-Node escuchando por dos puertos, uno por https y otro por http que sirven el mismo api rest

Aplicación basada en swagger-node-mw y express, que expone dos puertos, uno por https (8443) y otro por http (8080), y que comparten la misma definición del api-rest (usando el enfoque api-first, definida en el fichero swagger.yaml)

### 1. Generación de los certificados

Aquí se explica como hemos generado los certificados

```shell
$ openssl genrsa 2048 > host.key
$ chmod 400 host.key
$ openssl req -new -x509 -nodes -sha256 -days 365 -key host.key -out host.cert
```

### 2. Instalación de la aplicación

```shell
$ npm i
```

### 3. Arranque de la aplicación

```shell
$ npm run start
```

### 4. Test de la aplicación

Prueba del puerto http:

```shell
$ curl http://localhost:8080/hello?name=Scott
```

Prueba del puerto https:

```shell
$ curl -k https://localhost:8443/hello?name=Scott
```

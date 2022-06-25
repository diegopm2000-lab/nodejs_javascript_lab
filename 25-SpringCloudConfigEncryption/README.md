# Adding encryption support to Spring Cloud Config

## 1. Configure Spring Cloud Config

We can configure Spring Cloud config to support simetric encryption adding the __ENCRYPT_KEY__ environment variable to spring cloud config docker:

NOTE: Be sure that the API of the Spring Cloud Config is only accesible to authorized users to ensure the security of this method.

```yaml
version: '3.5'

services:

  configloader-springcfgserver:
    image: diegopm2000/springcloudconfigserver
    container_name: encryptionexample-springcfgserver
    ports:
      - "8888:8888"
    environment:
      - SPRING_CLOUD_CONFIG_SERVER_GIT_URI=https://github.com/diegopm2000-boilerplate/configurations.git
      - ENCRYPT_KEY=myencryptkey
```

## 2. Start the Spring Cloud Config Server

Executing this:

```shell
$ docker-compose up -d
```

## 3. Encrypt our password using the Spring Cloud Config API

```shell
$ curl localhost:8888/encrypt -d mysecret
dc9c242255bd5cd7bab586fc0670105273f2ea880d07cbf26c83c97b1d439d66
```

## 4. Mount the encrypted password into the configuration file

```yaml
database:
  user: myuser
  password: '{cipher}dc9c242255bd5cd7bab586fc0670105273f2ea880d07cbf26c83c97b1d439d66'
```

## 5. Test the loading of the configuration.

Spring Cloud Config will decrypt the password for us:

```shell
npm run start

> 25-springcloudconfigencryption@1.0.0 start /home/diego/workdir/proyectos-GitHub/laboratories/nodejs_lab/25-SpringCloudConfigEncryption
> node index.js

--> config loaded: {"database":{"password":"mysecret","user":"myuser"}}
```

## 6. Decrypt the password using the Spring Cloud Config API

You can decrypt the password using the api passing the encrypted password

```shell
$ curl localhost:8888/decrypt -d dc9c242255bd5cd7bab586fc0670105273f2ea880d07cbf26c83c97b1d439d66
mysecret
```

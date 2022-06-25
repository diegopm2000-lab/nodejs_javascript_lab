# Keycloak

Identity Server with OpenIDConnect Compliant

# 1. Start Keycloak

## 1.1 Keycloak without persistence

start the keycloak withtout database persistence

```shell
$ docker-compose up -d
```

Uses the port 8080 by default

# 2. Operating with keycloak

- Creates the realm (in the upper section): calculator
- Creates the role (in the upper section): operator
- Creates the client (backend client) for the API REST of calculator: account-backend, del tipo openIdConnect y seleccionamos como public, indicando como redirect URL: http://localhost:8080/*

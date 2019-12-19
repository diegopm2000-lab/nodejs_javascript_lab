# RBAC Management - Express Open API - OAS 3

RBAC Management Microservice using Express Open Api & OAS 3

The RBAC model is composed by these main components:

__user__:
- id: String
- username: String
- enabled: boolean
- groups: <<list of group Id's>>
- password: <<encrypted password>>

__group__
- id: String
- name: String
- roles: <<list of role Id's>>

__role__
- id: String
- name: String
- endpoints: <<list of endpoint Id's>>

__endpoint__
- id: String
- method: String (p.e: GET, POST, PUT, DELETE, PATCH, ...)
- url: String (p.e: /api/users/{userId})
- urlregex: String (p.e: /api/users/[^/?#])

We will use the urlregex to match the url passed as parameter to check if an authenticated user has permission over an endpoint

### 1. Install the dependencies

```shell
$ npm i
```

### 2. Start the mongo service

Go to usermanagement-infrastructure folder and execute:

```shell
$ docker-compose up -d
```

### 3. Start the Express Server

```shell
$ npm run start
```

### 4. Check the OAS 3 Documentation and test the app

use this endpoint in your browser:

http://localhost:8080/api-docs

and test the CRUD methods implemented

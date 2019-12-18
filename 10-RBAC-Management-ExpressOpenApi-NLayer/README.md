# RBAC Management - Express Open API - OAS 3

RBAC Management Microservice using Express Open Api & OAS 3

The RBAC model is composed by three main components:

__user__:
- userId: String
- groups: <<list of groupId's>>
- password: <<encrypted password>>

__group__
- groupId: String
- name: String
- roles: <<list of roleId's>>

__role__
- roleId: String
- name: String
- endpoints: <<list of endpoint's>>

__endpoint__
- method: String (p.e: GET, POST, PUT, DELETE, PATCH, ...)
- url: String (p.e: /api/users/{userId})
- urlregex: String (p.e: /api/users/[^/?#])

We will use the urlregex to match the url passed as parameter to check if an authenticated user has permission over an endpoint

__Details over the implementation__:

We will use MongoDB as Database, and we will create three collections: users, groups and roles. The endpoints will be introduced directly into the roles collection.

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

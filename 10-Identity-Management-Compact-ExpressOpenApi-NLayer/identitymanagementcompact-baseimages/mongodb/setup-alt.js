// setup-alt.js

print('Initializing mongo db');

// 1. Creation of admin user

db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [{ role: 'dbOwner', db: 'identityManagementCompactDB' }]
});

// 2. Creation of main app endpoints (only private endpoints)

db.createCollection('endpoints');

// 2.1 (Private) Endpoints related to USERS CRUD-MANAGEMENT 

db.endpoints.insert({
  id: 'endpoint-createUser',
  microapp: 'identity-service',
  name: 'createUser',
  description: 'create a new user',
  method: 'POST',
  url: '/api/private/identity-service/users',
});

db.endpoints.insert({
  id: 'endpoint-getAllUsers',
  microapp: 'identity-service',
  name: 'getAllUsers',
  description: 'get all users',
  method: 'GET',
  url: '/api/private/identity-service/users',
});

db.endpoints.insert({
  id: 'endpoint-getUserById',
  microapp: 'identity-service',
  name: 'getUserById',
  description: 'get user by Id',
  method: 'GET',
  url: '/api/private/identity-service/users/:userId',
});

db.endpoints.insert({
  id: 'endpoint-updateUserById',
  microapp: 'identity-service',
  name: 'updateUserById',
  description: 'update user by Id',
  method: 'PUT',
  url: '/api/private/identity-service/users/:userId',
});

db.endpoints.insert({
  id: 'endpoint-deleteUserById',
  microapp: 'identity-service',
  name: 'deleteUserById',
  description: 'delete user by Id',
  method: 'DELETE',
  url: '/api/private/identity-service/users/:userId',
});

db.endpoints.insert({
  id: 'endpoint-addGroupToUser',
  microapp: 'identity-service',
  name: 'addGroupToUser',
  description: 'add group to user',
  method: 'POST',
  url: '/api/private/identity-service/users/:userId/groups',
});

db.endpoints.insert({
  id: 'endpoint-deleteGroupToUser',
  microapp: 'identity-service',
  name: 'deleteGroupToUser',
  description: 'delete group from user',
  method: 'DELETE',
  url: '/api/private/identity-service/users/:userId/groups/:groupId',
});

// 2.2 (Private) Endpoints related to GROUPS CRUD-MANAGEMENT 

db.endpoints.insert({
  id: 'endpoint-createGroup',
  microapp: 'identity-service',
  name: 'createGroup',
  description: 'create a new group',
  method: 'POST',
  url: '/api/private/identity-service/groups',
});

db.endpoints.insert({
  id: 'endpoint-getAllGroups',
  microapp: 'identity-service',
  name: 'getAllGroups',
  description: 'get all groups',
  method: 'GET',
  url: '/api/private/identity-service/groups',
});

db.endpoints.insert({
  id: 'endpoint-getGroupById',
  microapp: 'identity-service',
  name: 'getGroupById',
  description: 'get group by Id',
  method: 'GET',
  url: '/api/private/identity-service/groups/:groupId',
});

db.endpoints.insert({
  id: 'endpoint-updateGroupById',
  microapp: 'identity-service',
  name: 'updateGroupById',
  description: 'update group by Id',
  method: 'PUT',
  url: '/api/private/identity-service/groups/:groupId',
});

db.endpoints.insert({
  id: 'endpoint-deleteGroupById',
  microapp: 'identity-service',
  name: 'deleteGroupById',
  description: 'delete group by Id',
  method: 'DELETE',
  url: '/api/private/identity-service/groups/:groupId',
});

db.endpoints.insert({
  id: 'endpoint-addRoleToGroup',
  microapp: 'identity-service',
  name: 'addRoleToGroup',
  description: 'add role to group',
  method: 'POST',
  url: '/api/private/identity-service/groups/:groupId/roles',
});

db.endpoints.insert({
  id: 'endpoint-deleteRoleFromGroup',
  microapp: 'identity-service',
  name: 'deleteRoleFromGroup',
  description: 'delete role from group',
  method: 'DELETE',
  url: '/api/private/identity-service/groups/:groupId/roles/:roleId',
});

// 2.3 (Private) Endpoints related to ROLES CRUD-MANAGEMENT 

db.endpoints.insert({
  id: 'endpoint-createRole',
  microapp: 'identity-service',
  name: 'createRole',
  description: 'create a new role',
  method: 'POST',
  url: '/api/private/identity-service/roles',
});

db.endpoints.insert({
  id: 'endpoint-getAllRoles',
  microapp: 'identity-service',
  name: 'getAllRoles',
  description: 'get all roles',
  method: 'GET',
  url: '/api/private/identity-service/roles',
});

db.endpoints.insert({
  id: 'endpoint-getRoleById',
  microapp: 'identity-service',
  name: 'getRoleById',
  description: 'get role by Id',
  method: 'GET',
  url: '/api/private/identity-service/roles/:roleId',
});

db.endpoints.insert({
  id: 'endpoint-updateRoleById',
  microapp: 'identity-service',
  name: 'updateRoleById',
  description: 'update role by Id',
  method: 'PUT',
  url: '/api/private/identity-service/roles/:roleId',
});

db.endpoints.insert({
  id: 'endpoint-deleteRoleById',
  microapp: 'identity-service',
  name: 'deleteRoleById',
  description: 'delete role by Id',
  method: 'DELETE',
  url: '/api/private/identity-service/roles/:roleId',
});

db.endpoints.insert({
  id: 'endpoint-addEndpointToRole',
  microapp: 'identity-service',
  name: 'addEndpointToRole',
  description: 'add endpoint to role',
  method: 'POST',
  url: '/api/private/identity-service/roles/:roleId/endpoints',
});

db.endpoints.insert({
  id: 'endpoint-deleteEndpointFromRole',
  microapp: 'identity-service',
  name: 'deleteEndpointFromRole',
  description: 'delete endpoint from role',
  method: 'DELETE',
  url: '/api/private/identity-service/roles/:roleId/endpoints/:endpointId',
});

// 2.4 (Private) Endpoints related to ENDPOINTS CRUD-MANAGEMENT 

db.endpoints.insert({
  id: 'endpoint-createEndpoint',
  microapp: 'identity-service',
  name: 'createEndpoint',
  description: 'create a new endpoint',
  method: 'POST',
  url: '/api/private/identity-service/endpoints',
});

db.endpoints.insert({
  id: 'endpoint-getAllEndpoints',
  microapp: 'identity-service',
  name: 'getAllEndpoints',
  description: 'get all endpoints',
  method: 'GET',
  url: '/api/private/identity-service/endpoints',
});

db.endpoints.insert({
  id: 'endpoint-getEndpointById',
  microapp: 'identity-service',
  name: 'getEndpointById',
  description: 'get endpoint by Id',
  method: 'GET',
  url: '/api/private/identity-service/endpoints/:endpointId',
});

db.endpoints.insert({
  id: 'endpoint-updateEndpointById',
  microapp: 'identity-service',
  name: 'updateEndpointById',
  description: 'update endpoint by Id',
  method: 'PUT',
  url: '/api/private/identity-service/endpoints/:endpointId',
});

db.endpoints.insert({
  id: 'endpoint-deleteEndpointById',
  microapp: 'identity-service',
  name: 'deleteEndpointById',
  description: 'delete endpoint by Id',
  method: 'DELETE',
  url: '/api/private/identity-service/endpoints/:endpointId',
});

print('-----------------> Endpoints inserted');

// 3. Roles

let cursor = db.endpoints.find();
let allEndpoints = [];
while (cursor.hasNext()) {
  let endpointIndex = cursor.next();
  allEndpoints.push(endpointIndex._id);
}

let resRoles = [
    db.createCollection('roles'),
    db.roles.insert({
      id: 'role-identity-manager',
      name: 'Identity Service Role Manager',
      endpoints: allEndpoints
    }),
]

// 4. Groups

let cursorRoles = db.roles.find();

while (cursorRoles.hasNext()) {
  db.createCollection('groups');
  let roleIndex = cursorRoles.next();
  if (roleIndex.id === 'role-identity-manager') {
    db.groups.insert({
      id: 'group-identity-admin',
      name: 'Identity Service Group Admin',
      roles: [roleIndex._id],
    });
  }
}

// 5. Users

let cursorGroups = db.groups.find();

while (cursorGroups.hasNext()) {
  db.createCollection('users');
  let groupIndex = cursorGroups.next();
  if (groupIndex.id === 'group-identity-admin') {
    db.users.insert({
      username: 'identity-admin',
      password: '$2b$12$QuKqYtZoSf3lTohVlEUsVeu78pRe7XBG3ZYXcS0DE286gXz9UWoTS',
      groups: [groupIndex._id],
    });
  }
}
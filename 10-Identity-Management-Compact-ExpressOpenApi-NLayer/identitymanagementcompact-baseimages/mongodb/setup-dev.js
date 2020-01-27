let res = [
    
    // DB Users
    
    db.createUser({
        user: 'admin',
        pwd: 'admin',
        roles: [{
            role: 'dbOwner',
            db: 'identityManagementCompactDB'
        }]
    }),

    // Calculator Micro App Endpoints

    // db.createCollection('endpoints'),
    // db.endpoints.insert({
    //     id: 'endpoint-calculator-add',
    //     microapp: 'calculator',
    //     name: 'add',
    //     description: 'add operation',
    //     method: 'GET',
    //     url: '/api/calculator/add',
    //     urlregex: '/api/calculator/add'
    // }),
    // db.endpoints.insert({
    //   id: 'endpoint-calculator-substract',
    //   microapp: 'calculator',
    //   name: 'substract',
    //   description: 'substract operation',
    //   method: 'GET',
    //   url: '/api/calculator/substract',
    //   urlregex: '/api/calculator/substract'
    // }),
    // db.endpoints.insert({
    //   id: 'endpoint-calculator-multiply',
    //   microapp: 'calculator',
    //   name: 'multiply',
    //   description: 'multiply operation',
    //   method: 'GET',
    //   url: '/api/calculator/multiply',
    //   urlregex: '/api/calculator/multiply'
    // }),
    // db.endpoints.insert({
    //   id: 'endpoint-calculator-divide',
    //   microapp: 'calculator',
    //   name: 'divide',
    //   description: 'divide operation',
    //   method: 'GET',
    //   url: '/api/calculator/divide',
    //   urlregex: '/api/calculator/divide'
    // }),

    // Roles

    // db.createCollection('roles'),
    // db.roles.insert({
    //   id: 'role-calculator-user',
    //   name: 'Calculator User',
    //   endpoints: [
    //       'endpoint-calculator-add',
    //       'endpoint-calculator-substract',
    //       'endpoint-calculator-multiply',
    //       'endpoint-calculator-divide'
    //   ]
    // }),

    // Groups

    db.createCollection('groups'),
    // db.groups.insert({
    //     id: 'group-investigators',
    //     name: 'Investigators Group',
    //     roles: [
    //         'role-calculator-user'
    //     ]
    // }),
    db.groups.insert({
      id: 'group-investigators',
      name: 'Investigators Group',
      roles: []
  }),

    // Users

    db.createCollection('users'),
    db.users.insert({
        id: 'user-newton',
        username: 'inewton',
        password: '$2b$12$QuKqYtZoSf3lTohVlEUsVeu78pRe7XBG3ZYXcS0DE286gXz9UWoTS',
        enabled: true,
        groups: [
          'group-investigators'
        ]
    }),
    db.users.insert({
      id: 'user-einstein',
      username: 'aeinstein',
      password: '$2b$12$QuKqYtZoSf3lTohVlEUsVeu78pRe7XBG3ZYXcS0DE286gXz9UWoTS',
      enabled: true,
      groups: [
        'group-investigators'
      ]
    })
]

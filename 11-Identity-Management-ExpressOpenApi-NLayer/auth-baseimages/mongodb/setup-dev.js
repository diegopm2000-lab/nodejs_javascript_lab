let res = [
    // DB Users
    db.createUser({
        user: 'admin',
        pwd: 'admin',
        roles: [{
            role: 'dbOwner',
            db: 'authDB'
        }]
    }),
]

const User = require('../models/user');

// let newUser = {
//         username: 'James',
//         password: 'james',
//         isAdmin: true,
//         shoppingCart: [],
//     }


User.deleteMany().then(() => {
//     return User.create(newUser);
//   }).then( () => {
      console.log('Database seeded');
});
const Balloon = require('../models/balloon');

let newBalloons = [
    {
        name: 'Red Balloon',
        color: 'Red',
        price: 4,
        qty: 99,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrECexM_qlP_ZWjtW9h0xidvgiBr5TFncrgGUbekZZEOxVxZrk',
    },
];


Balloon.deleteMany().then(() => {
    return Balloon.create(newBalloons);
  }).then( () => {
      console.log('Database seeded');
});
const Balloon = require('../models/balloon');
const Cake = require('../models/cake');
const hat = require('../models/hat');

let newBallons = [
    {
        name: 'Red Balloon',
        color: 'Red',
        price: 4,
        qty: 99,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRrECexM_qlP_ZWjtW9h0xidvgiBr5TFncrgGUbekZZEOxVxZrk',
    }
];




Balloon.deleteMany().then(() => {
    return Balloon.create(newBallons);
  }).then( () => {
      console.log('Database seeded');
  });
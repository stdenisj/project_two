const Balloon = require('../models/balloon');

let newBalloons = [
    {
        name: 'Red Balloon',
        color: 'Red',
        price: 5,
        qty: 99,
        img: 'images/redBalloons.jpg',
    },
    {
        name: 'Blue Balloon',
        color: 'Blue',
        price: 5,
        qty: 50,
        img: 'images/blueBalloons.jpg',
    },
    {
        name: 'Teal Balloon',
        color: 'Teal',
        price: 8,
        qty: 20,
        img: 'images/tealBalloons.jpg',
    }
];


Balloon.deleteMany().then(() => {
    return Balloon.create(newBalloons);
  }).then( () => {
      console.log('Database seeded');
});
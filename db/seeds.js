const Balloon = require('../models/balloon');

let newBalloons = [
    {
        category: 'balloon',
        name: 'Red Balloon',
        color: 'Red',
        price: 5,
        qty: 99,
        img: 'https://cf2.s3.souqcdn.com/item/2018/05/01/33/65/58/17/item_XL_33655817_131786462.jpg',
    },
    {
        category: 'balloon',
        name: 'Blue Balloon',
        color: 'Blue',
        price: 5,
        qty: 50,
        img: 'https://i.pinimg.com/originals/e4/b2/8c/e4b28c9affff7931689a48cb58f70f07.jpg',
    },
    {
        category: 'balloon',
        name: 'Teal Balloon',
        color: 'Teal',
        price: 8,
        qty: 20,
        img: 'https://mothersday.floralgaragesg.com/wp-content/uploads/2016/06/teal-balloon.jpg',
    }
];


Balloon.deleteMany().then(() => {
    return Balloon.create(newBalloons);
  }).then( () => {
      console.log('Database seeded');
});
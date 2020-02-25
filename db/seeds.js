const Balloon = require('../models/balloon');

let newBalloons = [
    {
        category: 'Balloon',
        name: 'Red Balloon',
        color: 'Red',
        price: 5,
        qty: 99,
        img: 'https://cf2.s3.souqcdn.com/item/2018/05/01/33/65/58/17/item_XL_33655817_131786462.jpg',
    },
    {
        category: 'Balloon',
        name: 'Blue Balloon',
        color: 'Blue',
        price: 5,
        qty: 50,
        img: 'https://i.pinimg.com/originals/e4/b2/8c/e4b28c9affff7931689a48cb58f70f07.jpg',
    },
    {
        category: 'Balloon',
        name: 'Teal Balloon',
        color: 'Teal',
        price: 8,
        qty: 20,
        img: 'https://mothersday.floralgaragesg.com/wp-content/uploads/2016/06/teal-balloon.jpg',
    },
    {
        category: 'Balloon',
        name: 'Green Balloon',
        color: 'Green',
        price: 5,
        qty: 1000,
        img: 'https://cdn.clipart.email/074faf7576edf8a0eaadcd3a41d5112b_ballons-green-duh-pinterest-birthdays-happy-birthday-_1600-2429.jpeg',
    }
];


Balloon.deleteMany().then(() => {
    return Balloon.create(newBalloons);
  }).then( () => {
      console.log('Database seeded');
});
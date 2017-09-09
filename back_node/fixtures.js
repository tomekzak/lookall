db.businesses.remove({});

db.businesses.insertMany([

  {
    "name": "Jonh's bakery",
    "address": "The Best Street",
    "votes": {
      "up": 100,
      "down": 50
    }
  },
  {
    "name": "Handmade bags",
    "address": "Baggy street",
    "votes": {
      "up": 23,
      "down": 3
    }
  },

]);
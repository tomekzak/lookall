db.businesses.remove({});

db.businesses.insertMany([

  {
    "name": "Jonh's bakery",
    "address": "The Best Street",
    "rates": [
      {"login": "admin", "rate": 3},
      {"login": "lukasz", "rate": 5},
    ]
  },
  {
    "name": "Handmade bags",
    "address": "Baggy street",
    "rates": []
  },

]);
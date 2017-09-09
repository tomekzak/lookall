db.users.remove({});

db.users.insertMany([
  {
    login: "admin",
    password: "secret"
  },
  {
    login: "lukasz",
    password: "lukasz"
  }
]);

db.businesses.remove({});

db.businesses.insertMany([

  {
    "name": "Jonh's bakery",
    "address": "The Best Street",
    "rates": [
      {"login": "admin", "rate": 3},
      {"login": "lukasz", "rate": 5},
    ],
    "comments": [],
    "category": "bakery",
    "description": "It's the best bakery. That's true."
  },
  {
    "name": "Handmade bags",
    "address": "Baggy street",
    "rates": [],
    "comments": [],
    "category": "clothing",
    "description": "If you're looking for a bag, simply go there!"
  },
  {
    "name": "Canvas shoes",
    "address": "Happy Cow St.",
    "rates": [],
    "comment": [
      {"login": "lukasz", "rate": 5}
    ],
    "category": "clothing",
    "description": "Shoes made of canvas. What else do you want?"
  }

]);
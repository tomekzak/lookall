db.users.remove({});

db.users.insertMany([
  {
    login: "admin",
    password: "secret",
    name: "John",
    surname: "Bull"
  },
  {
    login: "lukasz",
    password: "lukasz",
    name: "Łukasz",
    surname: "Makuch"
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
    "owner": "john",
    "comments": [],
    "rates": [],
    "category": "bakery",
    "description": "It's the best bakery. That's true.",
    "recommendations": ["lukasz"]
  },
  {
    "name": "Handmade bags",
    "address": "Baggy street",
    "rates": [],
    "owner": "lukasz",
    "comments": [],
    "rates": [],
    "category": "clothing",
    "description": "If you're looking for a bag, simply go there!",
    "recommendations": ["admin", "lukasz"]
  },
  {
    "name": "Canvas shoes",
    "address": "Happy Cow St.",
    "owner": "lukasz",
    "rates": [{"login": "lukasz", "rate": 5}],
    "comments": [
      {
        voters: [],
        login: "lukasz",
        content: "The first comment",
        date: ISODate("2017-03-12"),
        upvotes: 129,
        downvotes: 4
      }
    ],
    "category": "clothing",
    "description": "Shoes made of canvas. What else do you want?",
    "recommendations": []
  }

]);
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
    "name": " Ślusarstwo Produkcyjne",
    "address": " ul. E. Orzeszkowej 6   41-103 Siemianowice Ślaskie",
    "rates": [
      {"login": "admin", "rate": 3},
      {"login": "lukasz", "rate": 5},
    ],
    "owner": “Wojciech”,
    "comments": [],
    "rates": [],
    "category": “rzemiosło”,
    "description": “Jestem najlepszym ślusarzem w okolicy!”,
    "recommendations": ["lukasz"]
  },
  {
    "name": “Szewstwo”,
    "address": "ul. Gliwicka 84, 40-854 Katowice",
    "rates": [],
    "owner": “Maria”,
    "comments": [],
    "rates": [],
    "category": “ubrania I tekstylia”,
    "description": “Odnowa obuwia”,
    "recommendations": ["admin", "lukasz"]
  },
  {
    "name": “Ubezpieczenia”,
    "address": "ul. Styczniowa 28B, 40-305 Katowice",
    "owner": “Bogusław”,
    "rates": [{"login": "lukasz", "rate": 5}],
    "comments": [
      {
        voters: [],
        login: "lukasz",
        content: “Super ubezpieczalnia!”,
        date: ISODate("2017-03-12"),
        upvotes: 129,
        downvotes: 4
      }
    ],
    "category": “inne”,
    "description": “Najtańsze ubezpieczenia w mieście!”,
    "recommendations": []
  }

]);
module.exports = businessesCol => {

  return {

    async save(business) {
      console.log(business);
      return await businessesCol.insertOne(business)
    },

    async getAll() {
      return await businessesCol.find({}).toArray()
      /*
      [
        {
          "businesses": [
            {
              "name": "Piekarz Janek",
              "votes": {
                "positive": 123,
                "negative": 4,
                "neutral": 20,
              },
              "thumbnailUrl": "https://",
              "address": "ul. Warszawska 143",
              "description": "Najleprszy Piekarz"
            }
          ]
        }
      ]
      */
    }
  }

}

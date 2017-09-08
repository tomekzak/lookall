const express = require('express')
const app = express()

app.get('/getAll', function (req, res) {
  res.json([
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
  ])
})

const port = 5000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
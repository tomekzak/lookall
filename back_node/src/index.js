const express = require('express')
const makeBusinesses = require('./businesses')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/lookall';

(async () => {
  const db = await MongoClient.connect(url)

  const businesses = makeBusinesses(db.collection("businesses"))


  app.get('/business/all', async (req, res) => {
    res.json(await businesses.getAll())
  })

  app.post('/business', async (req, res) => {
    await businesses.addNew()
  })

  const port = 5000;
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
  })

})()

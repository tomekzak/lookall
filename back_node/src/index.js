const express = require('express')
const makeBusinesses = require('./businesses')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
const MongoClient = require('mongodb').MongoClient

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO || 'mongodb://localhost:27017/lookall';

(async () => {
  const db = await MongoClient.connect(mongoUrl)

  const businesses = makeBusinesses(db.collection("businesses"))

  app.get('/business/all', async (req, res) => {
    res.json(await businesses.getAll())
  })

  app.post('/business', async (req, res) => {
    await businesses.save(req.body)
    res.status(200).end()
  })

  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
  })

})()

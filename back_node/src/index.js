// God forgive us all those things...
const express = require('express')
const makeBusinesses = require('./businesses')
const users = require('./users');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(users.readUser)
const MongoClient = require('mongodb').MongoClient

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO || 'mongodb://localhost:27017/lookall';

(async () => {
  const db = await MongoClient.connect(mongoUrl)

  const businesses = makeBusinesses(db.collection("businesses"))

  // authorization related endpoints
  app.post('/auth/login', async (req, res) => {
    if (users.isPasswordValid(req.body.login, req.body.password)) {
      const token = users.getJWT(req.body.login)
      res.json({token});
    } else {
      res.status(403).end()
    }
  })

  app.post('/auth/register', async (req, res) => {
    try {
      users.addUser(req.body.login, req.body.password)
      return res.status(200).end()
    } catch (e) {
      if (e.code == 'user_already_exists') {
        return res.status(403).json({error: e.code})
      }

      return res.status(403).end
    }
  })

  // only for logged in users
  // app.post('/business', users.denyUnlessLoggedIn, async (req, res) => {
  //   await businesses.save(req.body)
  //   res.status(200).end()
  // })

  //comment a business
  app.post('/business/comment', users.denyUnlessLoggedIn, async (req, res) => {
    await businesses.comment(
      login,
      req.body.businessId,
      req.body.comment
    );
  })

  //rate a business
  app.post('/business/rate', users.denyUnlessLoggedIn, async (req, res) => {
    await businesses.rate(
      req.user.login,
      req.body.businessId,
      req.body.stars
    )
    res.status(200).end()
  })

  // publicly available endpoints

  app.get('/business/all', async (req, res) => {
    res.json(await businesses.getAll())
  })

  // the server itself

  app.listen(port, function () {
    console.log(`API listening on port ${port}!`)
  })

})()

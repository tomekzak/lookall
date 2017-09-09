// God forgive us all those things...
const express = require('express')
const makeBusinesses = require('./businesses')
const makeUsers = require('./users');
const bodyParser = require('body-parser')

const app = express()

const MongoClient = require('mongodb').MongoClient

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO || 'mongodb://localhost:27017/lookall';

(async () => {
  const db = await MongoClient.connect(mongoUrl)

  const businesses = makeBusinesses(db.collection("businesses"))
  const users = makeUsers(db.collection('users'))

  app.use(bodyParser.json())
  app.use(users.readUser)

  // authorization related endpoints
  app.post('/auth/login', async (req, res) => {
    if (await users.isPasswordValid(req.body.login, req.body.password)) {
      const token = users.getJWT(req.body.login)
      res.json({token});
    } else {
      res.status(403).end()
    }
  })

  app.post('/auth/register', async (req, res) => {
    try {
      await users.addUser(
        req.body.login,
        req.body.password,
        req.body.name,
        req.body.surname,
      )
      return res.status(200).end()
    } catch (e) {
      if (e.code == 'user_already_exists') {
        return res.status(403).json({error: e.code})
      }

      return res.status(403).end
    }
  })

  // only for logged in users

  //comment a business
  app.post('/business/comment', users.denyUnlessLoggedIn, async (req, res) => {
    await businesses.comment(
      req.user.login,
      req.body.businessId,
      req.body.comment
    );
    res.status(200).end()
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

  app.post('/business', users.denyUnlessLoggedIn, async (req, res) => {
    await businesses.save(req.user.login, req.body)
    res.status(200).end();
  })

  // publicly available endpoints

  app.get('/categories', async (reg, res) => {
    res.json(await businesses.getCategories())
  })

  app.get('/business/find', async (req, res) => {
    const params = {
      category: req.query.category + ""
    }
    res.json(await businesses.find(params))
  })

  app.get('/business/all', async (req, res) => {
    res.json(await businesses.getAll())
  })

  app.get('/business/:id', async (req, res) => {
    try {
      const business = await businesses.getOneBusiness(req.params.id)
      return res.json(business)
    } catch (e) {
      if (e.code == 'business_not_found') return res.status(404).end()
      throw e
    }
  })


  // the server itself

  app.listen(port, function () {
    console.log(`API listening on port ${port}!`)
  })

})()

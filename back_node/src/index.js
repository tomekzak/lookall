// God forgive us all these things...
// And please make bad people stay away from that vulnerable app.
const express = require('express')
const makeBusinesses = require('./businesses')
const makeUsers = require('./users');
const bodyParser = require('body-parser')
const multer  = require('multer')
const path = require('path')
var upload = multer({ dest: path.join(__dirname, '..', 'upload') })

const app = express()
if (process.env.NODE_ENV != 'production') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    next()
  })
}
app.use('/images', express.static(path.join(__dirname, '..', 'images')))

const MongoClient = require('mongodb').MongoClient

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO || 'mongodb://localhost:27017/lookall';

(async () => {
  const db = await MongoClient.connect(mongoUrl)

  const businesses = makeBusinesses(
    db.collection("businesses"),
    db.collection("recommended_businesses")
  )
  const users = makeUsers(db.collection('users'))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(users.readUser)

  // authorization related endpoints
  app.post('/auth/login', async (req, res) => {
    if (await users.isPasswordValid(req.body.login, req.body.password)) {
      const token = await users.getJWT(req.body.login)
      const user = await users.getUser(req.body.login)
      res.json(Object.assign(
        {},
        {token},
        {login: user.login, name: user.name, surname: user.surname}
      ));
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

  app.post('/business/upvote_comment', users.denyUnlessLoggedIn, async (req, res) => {
    try {
      await businesses.voteOnComment({
        businessId: req.body.businessId,
        login: req.body.login,
        upvotesChange: 1,
        downvotesChange: 0
      })
      res.status(200).end()
    } catch (e) {
      return res.json({error: "already_voted"})
    }
  })

  app.post('/business/downvote_comment', users.denyUnlessLoggedIn, async (req, res) => {
    try {
      await businesses.voteOnComment({
        businessId: req.body.businessId,
        login: req.body.login,
        upvotesChange: 0,
        downvotesChange: 1
      })
      res.status(200).end()
    } catch (e) {
      return res.json({error: "already_voted"})
    }
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

  app.post('/business/edit', users.denyUnlessLoggedIn, upload.single('image'), async (req, res) => {
    const newBusiness = Object.assign(
      {},
      req.body,
      {image: req.file},
      {comments: [], rates: []}
    )
    await businesses.edit(
      req.body.businessId,
      newBusiness
    )
    res.status(200).end();
  })

  app.post('/business', users.denyUnlessLoggedIn, upload.single('image'), async (req, res) => {
    const newBusiness = Object.assign(
      {},
      req.body,
      {image: req.file},
      {comments: [], rates: []}
    )
    await businesses.save(
      req.user.login,
      newBusiness
    )
    res.status(200).end();
  })

  app.post('/business/recommendExisting', async (req, res) => {
    await businesses.recommendExisting({
      login: req.user.login,
      businessId: req.body.businessId
    })
    res.status(200).end()
  })

  app.post('/business/recommendNew', async (req, res) => {
    await businesses.recommendNew({
      contactInfo: req.body.contactInfo,
      category: req.body.category,
      login: req.user.login
    })
    res.status(200).end()
  })

  // publicly available endpoints

  app.get('/categories', async (reg, res) => {
    res.json(await businesses.getCategories())
  })

  app.get('/business/find', async (req, res) => {
    const query = Object.assign(
      {},
      req.query.category ? {category: req.query.category} : {},
      req.query.owner ? {owner: req.query.owner} : {},
    )
    res.json(await businesses.find(query))
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

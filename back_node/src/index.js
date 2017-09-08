const express = require('express')
const app = express()
const businesses = require('./businesses')

app.get('/business/all', async (req, res) => {
  res.json(await businesses.getAll())
})

const port = 5000;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
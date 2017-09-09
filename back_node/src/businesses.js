const id = require('mongodb').ObjectID
const err = code => {
  let e = new Error
  e.code = code
  return e
}
const avg = numbers => numbers.length > 0
  ? numbers.reduce((soFar, number) => soFar + number, 0) / numbers.length
  : 0
const removeUnderscoreFromId = entry => Object.assign({}, entry, {id: entry._id, _id: undefined})
const entryExists = (rows, keyName, entry) =>
  rows.some(row => row[keyName] == entry[keyName])

const addOrReplace = (rows, keyName, newEntry) => {
  if (entryExists(rows, keyName, newEntry)) {
    //replace
    return rows.map(row => {
      if (row[keyName] == newEntry[keyName]) {
        return newEntry
      } else {
        return row
      }
    })
  } else {
    //add
    return [].concat(rows).push(newEntry)
  }
}

/*

{
  name: "Best Bakery",
  rates: [
    {login: "lukasz", rate: 5}
  ],
  comments: [
    {login: "lukasz", content: "It's a great bakery", date}
  ]
}
*/
module.exports = (col) => ({

  async save(business) {
    return col.insertOne(business)
  },

  async comment(login, businessId, comment) {
    const newComment = {
      login,
      content: comment,
      date: new Date()
    }

    const business = await this.getOneBusiness(businessId)
    const businessWithNewComment = Object.assign({}, business, {
      comments: addOrReplace(business.comments, 'login', newComment)
    })
    return col.updateOne({_id: id(businessId)}, businessWithNewComment)
  },

  async getOneBusiness(businessId) {
    const query = {_id: id(businessId)};
    const business = await col.findOne({_id: id(businessId)})
    if (!business) throw err("business_not_found")
    return removeUnderscoreFromId(business)
  },

  async rate(login, businessId, stars) {
    const business = await this.getOneBusiness(businessId)
    let altered = false
    business.rates.forEach(singleRate => {
      if (singleRate.login == login) {
        singleRate.rate = stars
        altered = true
      }
    })

    if (!altered) business.rates.push({login, rate: stars})

    return col.updateOne(
      {_id: id(businessId)},
      { "rates": business.rates}
    )
  },

  async getAll() {
    const businesses = await col.find({}).toArray();
    return businesses
      .map(business => Object.assign({}, business, {
        avgRate: avg(business.rates.map(ratedByUser => ratedByUser.rate))
      }))
      .map(removeUnderscoreFromId)
  }
})




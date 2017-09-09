const id = require('mongodb').ObjectID
const err = code => {
  let e = new Error
  e.code = code
  return e
}
const avg = numbers => numbers.length > 0
  ? numbers.reduce((soFar, number) => soFar + number, 0) / numbers.length
  : 0

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

  }

  async getOneBusiness(businessId) {
    const business = await col.findOne({_id: id(businessId)})
    if (!business) throw err("business_not_found")
    return business
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
      .map(business => Object.assign({}, business, {id: business._id, _id: undefined}))
  }
})




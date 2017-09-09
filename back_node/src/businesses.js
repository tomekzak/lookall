const id = require('mongodb').ObjectID
const err = code => {
  let e = new Error
  e.code = code
  return e
}
/*

{
  name: "Best Bakery",
  rates: [
    {login: "lukasz", rate: 5}
  ]
}

*/
module.exports = (col) => ({

  async save(business) {
    return col.insertOne(business)
  },

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
    return col.find({}).toArray()
  }
})




const fs = require('fs')
const uuidv4 = require('uuid/v4')
const id = require('mongodb').ObjectID

const err = code => {
  let e = new Error
  e.code = code
  return e
}
const avg = numbers => numbers.length > 0
  ? numbers.reduce((soFar, number) => soFar + number, 0) / numbers.length
  : 0
const addUnderscoreLessId = entry => Object.assign({}, entry, {id: entry._id})
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
    return [].concat(rows).concat([newEntry])
  }
}

const addAvgRate = business => Object.assign({}, business, {
  avgRate: avg(business.rates.map(ratedByUser => ratedByUser.rate))
})

const prepareBusinessForReturning = businessFromDb => addAvgRate(addUnderscoreLessId(businessFromDb))

const moveFileToImages = (originalFilename, path) => {
  //TODO: do validation
  //TODO: extract that filetype
  const ext = ".jpg"
  const newFilename = uuidv4() + ext
  const newPath = __dirname + "/../images/" + newFilename
  fs.renameSync(path, newPath)
  return "/images/" + newFilename
}

module.exports = (col) => ({
  async save(login, business) {
    const pathToImage = moveFileToImages(
      business.image.originalname,
      business.image.path
    )
    const businessParameters = {
      name: business.name,
      address: business.address,
      category:  business.category,
      description: business.description,
      rates: [],
      comments: [],
      owner: login,
      image: pathToImage
    }

    return col.insertOne(businessParameters)
  },

  async delete(businessId) {
    return col.removeOne({_id: businessId})
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
    return addUnderscoreLessId(business)
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
    return businesses.map(prepareBusinessForReturning)
  },

  async getCategories() {
    return col.distinct("category")
  },

  async find(params) {
    const query = {category: params.category}
    const businesses = await col.find(query).toArray()
    return businesses.map(prepareBusinessForReturning)
  }

})




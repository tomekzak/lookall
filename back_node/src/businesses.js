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

module.exports = (collOfBusinesses, collOfNewBusinesses) => ({
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
      recommendations: [],
      owner: login,
      image: pathToImage
    }

    return collOfBusinesses.insertOne(businessParameters)
  },

  async delete(businessId) {
    return collOfBusinesses.removeOne({_id: businessId})
  },

  async voteOnComment({businessId, login, upvotesChange, downvotesChange}) {
    var business
    try {
      business = await this.getOneBusiness(businessId)
    } catch (e) {
      return;
    }

    if (!business) {
      throw err("business_not_found")
    }

    const changedComment = business.comments.find(c => c.login == login)

    if (changedComment.voters.includes(login)) {
      throw err("already_voted")
    }

    changedComment.upvotes += upvotesChange
    changedComment.downvotes += downvotesChange
    changedComment.voters.push(login)

    const businessWithChangedComment = Object.assign({}, business, {
      comments: addOrReplace(business.comments, 'login', changedComment)
    })

    return collOfBusinesses.updateOne({_id: id(businessId)}, businessWithChangedComment)
  },

  async comment(login, businessId, comment) {
    const newComment = {
      login,
      content: comment,
      upvotes: 0,
      downvotes: 0,
      date: new Date()
    }

    const business = await this.getOneBusiness(businessId)
    const businessWithNewComment = Object.assign({}, business, {
      comments: addOrReplace(business.comments, 'login', newComment)
    })
    return collOfBusinesses.updateOne({_id: id(businessId)}, businessWithNewComment)
  },

  async recommendExisting({login, businessId}) {
    collOfBusinesses.updateOne(
      {_id: businessId},
      { $addToSet: { recommendations: login } }
    )
  },

  async recommendNew({contactInfo, category, login}) {
    collOfNewBusinesses.insertOne({login, category, contactInfo})
  },

  async getOneBusiness(businessId) {
    const query = {_id: id(businessId)};
    const business = await collOfBusinesses.findOne({_id: id(businessId)})
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

    return collOfBusinesses.updateOne(
      {_id: id(businessId)},
      { "rates": business.rates}
    )
  },

  async getAll() {
    const businesses = await collOfBusinesses.find({}).toArray();
    return businesses.map(prepareBusinessForReturning)
  },

  async getCategories() {
    return collOfBusinesses.distinct("category")
  },

  async find(params) {
    const businesses = await collOfBusinesses.find(params).toArray()
    return businesses.map(prepareBusinessForReturning)
  }

})




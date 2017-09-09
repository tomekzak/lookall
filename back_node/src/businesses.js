const id = require('mongodb').ObjectID

module.exports = businessesCol => {

  return {

    async save(business) {
      return await businessesCol.insertOne(business)
    },

    async upvote(businessId) {
      return await businessesCol.updateOne(
        {_id: id(businessId)},
        {
          $inc: {"votes.up": 1}
        }
      )
    },

    async getAll() {
      return await businessesCol.find({}).toArray()
    }
  }

}

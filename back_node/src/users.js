// long long time ago in a far away galaxy, here was bcrypt, but then windows appeared
const jwt = require("jsonwebtoken")
const secret = process.env.JWTKEY || "so secret it cannot be more secret";

/*
- user provides: surname, name, login, password
- user is required to recommend somebody:
  - already existing business
  - a new business (name, contact, category)
*/

module.exports = col => {
  return {

      async userAlreadyExists(login) {
        return col.findOne({login: "" + login})
      },

      async addUser(login, password, name, surname) {
        //TODO: here's a race condition, fix it!
        if (await this.userAlreadyExists(login)) {
          let err = new Error
          err.code = "user_already_exists"
          throw err
        }

        return col.insertOne({login, password, name, surname})
      },

      readUser(req, res, next) {
        const sentHeader = req.get("Authorization")
        if (!sentHeader) return next();
        const justHeader = sentHeader.substr(7);
        try {
          const user = jwt.verify(justHeader, secret);
          req.user = user
          next()
        } catch (e) {
          return next()
        }
      },

      denyUnlessLoggedIn(req, res, next) {
        req.user ? next() : res.status(403).end()
      },

      async isPasswordValid(login, password) {
        const user = await col.findOne({login})
        if (!user) return false
        return password == user.password
      },

      async getUser(login) {
        return col.findOne({login: "" + login})
      },

      async getJWT(login) {
        return jwt.sign({login}, secret);
      }

  }
}


const bcrypt = require("bcrypt")
const cost = process.env.BCRYPTCOST || 12
const jwt = require("jsonwebtoken")
const secret = process.env.JWTKEY || "so secret it cannot be more secret";

const users = [
  {
    login: "admin",
    passwordHash: "$2a$12$judEQBcoZSg817S68HP4Ye.WfLgfjBvT35CSfHt95DRPZBrbutOzK"
  },
  {
    login: "lukasz",
    passwordHash: "$2a$12$fCiZ8g3SZtz0cjHrWYs6sebEmi.rQTHduFRkiuEw7oGs5iwu8Dniy"
  }
];

module.exports = {

  userAlreadyExists(login) {
    return users.some(u => u.login == login)
  },

  addUser(login, password) {
    if (this.userAlreadyExists(login)) {
      let err = new Error
      err.code = "user_already_exists"
      throw err
    }

    users.push({
      login,
      password: bcrypt.hash(password, cost)
    })
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

  isPasswordValid(login, password) {
    const user = users.find(u => u.login == login)
    if (!user) return false
    const hash = user.passwordHash
    return bcrypt.compareSync(password, hash);
  },

  getJWT(login) {
    return jwt.sign({login}, secret);
  }

}
// long long time ago in a far away galaxy, here was bcrypt, but then windows appeared
const jwt = require("jsonwebtoken")
const secret = process.env.JWTKEY || "so secret it cannot be more secret";

const users = [
  {
    login: "admin",
    password: "secret"
  },
  {
    login: "lukasz",
    password: "lukasz"
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
      password: password
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
    return password == user.password
  },

  getJWT(login) {
    return jwt.sign({login}, secret);
  }

}
const { sign, verify } = require("jsonwebtoken")
const { user } = require("../model/model")

module.exports = {
    get: async(req, res) => {
        return res.end('ok')
    },
    post: async(req, res) => {
        const { login, password } = req.body
        const object = { login, password: sign(password), token: sign(`${login}${password}...`) }
        await user.create(object)
        return res.json({ token: object.token })
    }
}
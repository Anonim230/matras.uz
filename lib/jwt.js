const jwt = require("jsonwebtoken");

const secret_word = "Very secret word which you can't find!"

module.exports = {
    sign: payload => jwt.sign(JSON.stringify(payload), secret_word),
    verify: token => JSON.parse(jwt.verify(token, secret_word))
}
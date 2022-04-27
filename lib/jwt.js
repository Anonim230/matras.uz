const jwt = require("jsonwebtoken");

const secret_word = "Very secret word which you can't find!"

module.exports = {
    sign: payload => jwt.sign(JSON.stringify(payload), secret_word),
    verify: token => jwt.verify(JSON.parse(token), secret_word)
}
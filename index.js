const express = require('express')
const router = require('./routes')
require('./model/model')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
// console.log(http.STATUS_CODES);
app.use(router)
app.listen(port, () => console.log(`Listening on port ${port}`))
module.exports = app
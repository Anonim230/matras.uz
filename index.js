const express = require('express')
const router = require('./routes')
require('./model/model')
app.use(express.json())
const app = express()
const port = process.env.PORT || 3000

app.use(router)

app.listen(port, () => console.log(`Listening on port ${port}`))
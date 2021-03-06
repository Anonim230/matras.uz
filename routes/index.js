const { Router } = require('express');
const matras = require('../modules/matras')
const user = require('../modules/user')

const router = Router()
const imports = { matras, user }
for (let i of Object.keys(imports)) {
    for (let j of Object.keys(imports[i]))
        if (j === 'delete') router.delete(`/api/${i}`, imports[i][j])
        else j === 'get' ? router.get(`/api/${i}`, imports[i][j]) : router.post(`/api/${i}`, imports[i][j])
}

module.exports = router
const { sign, verify } = require("../lib/jwt")
const { user } = require("../model/model")

module.exports = {
    get: async(req, res) => {
        const { token } = req.query
        console.log(verify(token));
        res.end('ok')
    },
    post: async(req, res) => {
        const { login, password } = req.body
        if(!(login && password)) return res.status(418).send("You're a Teapot")
        const object = { login, password: sign(password), token: sign(`${login}.:|:.${password}...`) }
        await user.create(object)
        return res.json({ token: object.token })
    },
    delete: async(req, res) => {
        const { token, id, name } = req.body
        const object = {}
        if(token)object.token = token
        else if(id)object.id = id
        else if(name)object.name = name
        try{
            await (await user.findOne({ where: object })).set('isDeleted', true)
            res.send('ok')
        }catch(e){
            console.log(e);
            res.status(405).send('Error')
        }
    }
}
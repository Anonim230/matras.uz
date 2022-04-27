const { Op, where } = require("sequelize");
const { changeType } = require("../lib/utils");
const { matras } = require("../model/model");

module.exports = {
    get: async(req, res) =>{
        const query = req.query
        let object = {}
        for(let i in query){
            if(i === 'id')(object.id = query[i]) 
            if(i === 'currency')(object.currency = query[i]) 
            if(i === 'name')object.name = { [Op.iLike] : `%${query[i]}%` }
            if(i === 'weight')object.weight = {[Op.lte]: changeType(query[i], 'int') }
            if(i === 'cheap')object.price = {[Op.lte]: changeType(query[i], 'int') }
            if(i === 'expensive')object.price = {[Op.lte]: changeType(query[i], 'int') }
        }
        object.isDeleted = false
        console.log(query, object);
        // res.end('Ok')
        res.json(await matras.findAll({ where: object }))
    },
    post: async(req, res) => {
        const { name, weight, price, currency, description, capacity, warranty, size} = req.body
        const object = {}
        if(!(name && price))return res.status(406).send()
        object.name = name
        object.price = changeType(price, 'int')
        try{
            if(weight)object.weight = changeType(weight, 'int')
            if(currency)object.currency = currency
            if(description)object.description = description
            if(capacity)object.capacity = changeType(capacity, 'int')
            if(warranty)object.warranty = changeType(warranty, 'int')
            if(size)object.size = size
            const new_matras = await matras.create(object).catch(e=>console.log(e))
            return res.json(new_matras)
        }catch(e){
            console.log(e);
            return res.status(405).send()
        }
    },
    delete: async(req, res) => {
        const { id } = req.body
        try{
            ;(await matras.findByPk(id)).set('isDeleted', true)
            return res.send('Ok')
        }catch(e){
            console.log(e);
            res.status(405).send()
        }
    }
}
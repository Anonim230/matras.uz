const {Sequelize, DataTypes} = require("sequelize");

const connection_string = "postgres://qivoijvm:dkHxhhN4MxlrtVpndiLWaltzBWpbFzXF@arjuna.db.elephantsql.com/qivoijvm"

const sequelize = new Sequelize(connection_string, {logging:false})
const ID = {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
};
const matras = sequelize.define('matras', {
    ID,
    img:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://apollo-olx.cdnvideo.ru:443/v1/files/z8i0xmkinkku2-UZ/image'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    weight: DataTypes.INTEGER,
    oldPrice: DataTypes.INTEGER,
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: "so'm"
    },
    description: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    warranty: DataTypes.INTEGER,
    size: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
},{ freezeTableName: true })

const user = sequelize.define('user',{
    ID,
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{ freezeTableName: true })

try{
    sequelize.authenticate()
    console.log('Ok');
}catch(e){
    console.log(e);
}finally{
    sequelize.sync()
}
module.exports = {
    matras,
    user,
    sequelize
}
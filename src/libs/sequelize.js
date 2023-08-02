const {Sequelize}= require('sequelize');

const {config} = require('../config/config');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;



var sequelize = new Sequelize(URI,{


    dialect: 'postgres',
    logging: false,
});

sequelize.sync({ force: false }).then(() => {
    console.log("Tablas sincronizadas");
});



module.exports = {sequelize};


require('dotenv').config();
module.exports = {
    dev: {
        database:process.env.DATABASE,
        username:process.env.USER_NAME,
        password:process.env.PASSWORD,
        host:process.env.HOST,
        port: 3306
    },
    prod:{
    }
  };

var db = require('./index')
const seq = require('sequelize');

var Model = db.defineModel('users', {
    content: seq.TEXT,
    title: seq.STRING(30),
    startDate: seq.BIGINT,
    expireDate: seq.BIGINT,
    gmId: seq.INTEGER(10),
});

module.exports = Model
const Sequelize = require('sequelize');
const envConfigs = require('./config');

var config = envConfigs['dev']

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql'
});

/**
* 定義資料模型
* 
* @param {any} name 模型名稱【資料庫表名】
* @param {any} attributes 資料欄位集合
* @returns 資料模型物件
*/
function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    // 附加公共欄位
    // attrs.id = {
    //   type: ID_TYPE,
    //   primaryKey: true
    // };
    attrs.createAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updateAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    // 狀態：0表示有效，1表示無效，2表示已刪除，預設為0.
    attrs.status = {
        type: Sequelize.INTEGER,
        allowNull: false
    };
    // 呼叫seq的方法定義模型並返回
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    obj.updateAt = now;
                    obj.version;
                }
            }
        }
    });
}
function connDB() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
}

module.exports = {
    connDB,
    defineModel
}
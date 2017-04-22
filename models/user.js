'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        bio: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        lastLoginAt: DataTypes.DATE
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        freezeTableName: true,
        instanceMethods: {
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
            },
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
        }
    });

    User.beforeCreate(function(user, options) {
        return generateHash(user.password).then(function (hashedPw) {
            user.password = hashedPw;
        });
    })

    return User;
};

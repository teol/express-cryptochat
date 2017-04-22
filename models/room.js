'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    order: DataTypes.INT,
    expiresAt: DataTypes.TIMESTAMP,
    createdAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Room;
};
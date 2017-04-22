'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    content: DataTypes.TEXT,
    userId: DataTypes.INT,
    roomId: DataTypes.INT,
    sentAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Message;
};
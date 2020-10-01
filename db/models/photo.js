'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Photo;
};
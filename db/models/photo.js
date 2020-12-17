'use strict';
module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    caption: DataTypes.STRING
  }, {});
  Photo.associate = function(models) {
    Photo.belongsTo(models.User, { foreignKey: 'userId' });
    Photo.hasMany(models.Comment, { foreignKey: 'photoId' });
  };
  return Photo;
};
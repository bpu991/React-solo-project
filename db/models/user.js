'use strict';
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs'); 
const { default: User } = require("../../client/src/components/User");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [1, 40],
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Photo, { foreignKey: 'userId' });
    User.hasMany(models.Comment, { foreignKey: 'userId' });
  };

  User.prototype.toSafeObject = function () {
    console.log(this)
    const {
      id,
      username,
      email,
      Photos
    } = this;
    let userPhotos 

    if(Photos) {
      userPhotos = Photos.map((p) => p.url);
    }
    return { id, username, email, userPhotos};
  }

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function(id) {
    return await User.findByPk(id);
  }

  User.login = async function ({username, password}) {
    console.log(username, password);
    const user = await User.findOne({
      where: {
        [Op.or]: [{username}, {email: username}],
      }
    })

    if (user && user.validatePassword(password)) {
      return await User.getCurrentUserById(user.id);
    }
  }

  User.signup = async function({ username, email, password }) {
    const hashedPassword = bcrypt.hashsync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.getCurrentUserById(user.id);
  }
  return User;
};
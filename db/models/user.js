'use strict';

const { default: User } = require("../../client/src/components/User");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  };

 


  User.prototype.toSafeObject = function () {
    const {
      id,
      username
    } = this;

    return { id, username};
  }

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function(id) {
    return await User.scope("currentuser").findByPk(id);
  }

  User.login = async function ({username, password}) {
    const user = await User.scope('loginuser').findOne({
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
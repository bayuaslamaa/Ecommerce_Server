'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email must be not an empty string'
        }
      }
    }
    ,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email must be not an empty string'
        }
      }
    }

  },
    {
      sequelize,
      modelName: 'User'
    })
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
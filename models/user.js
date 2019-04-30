'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    uid : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },

    email: {
      type :  DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        isEmail : true
      }
    },

    password: {
      type : DataTypes.STRING,
      allowNull : false
    },

    isAdmin: {
      type :DataTypes.BOOLEAN,
      allowNull : false
    },

  }, {});
  
  return User;
};
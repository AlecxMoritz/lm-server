'use strict';

module.exports = (sequelize, DataTypes) => {
  const Goal = sequelize.define('Goal', {
    uid : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },

    user_uid : {
        type : DataTypes.INTEGER,
        allowNull : false
    },

    name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    completion_date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },

    start : {
        type : DataTypes.DATEONLY,
        allowNull : false
    }
    
    
  }, {});

  return Goal;
};
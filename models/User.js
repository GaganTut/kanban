/*jshint esversion: 6*/
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Card, {
          foreignKey: {
            name: 'createdBy',
            allowNull: false
          }
        });
        User.hasMany(models.Card, {
          foreignKey: {
            name: 'assignedTo',
            allowNull: false
          }
        });
        User.belongsToMany(models.Board, {
          through: {model: 'Users_In_Boards', unique: false, as: 'Boards'}
        });
      }
    }
  });
  return User;
};
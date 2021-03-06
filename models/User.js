/*jshint esversion: 6*/
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullname: {
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
        User.belongsToMany(models.Board, {
          through: {model: 'BoardUser'}
        });
      }
    }
  });
  return User;
};
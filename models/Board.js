module.exports = function(sequelize, DataTypes) {
  let Board = sequelize.define("Board", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Board.belongsToMany(models.User, {
          through: {model: 'BoardUser', unique: false, as: 'Contributors'},
        });
        Board.hasMany(models.Card, {
          foreignKey: {
            name: 'attachedTo',
            allowNull: false
          }
        });
      }
    }
  });

  return Board;
};
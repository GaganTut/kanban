module.exports = function(sequelize, DataTypes) {
  let Board = sequelize.define("Board", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Board.belongsTo(models.User, {
          as: 'Owner',
          foreignKey: {
            allowNull: false,
            name: 'ownedBy'
          }
        });
        Board.belongsToMany(models.User, {
          through: {model: 'Users_In_Boards', unique: false, as: 'Contributors'},
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
module.exports = function(sequelize, DataTypes) {
  let Board = sequelize.define("Board", {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        Board.hasMany(models.Card, {
          foreignKey: {
            allowNull: false,
          }
        });
      }
    }
  });

  return Board;
};
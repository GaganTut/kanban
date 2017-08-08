module.exports = function(sequelize, DataTypes) {
  let Card = sequelize.define("Card", {
    title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Queue', 'Progress', 'Completed'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('Urgent', 'High', 'Medium', 'Low'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500)
    },
  }, {
    classMethods: {
      associate: function(models) {
        Card.belongsTo(models.User, {
          as: 'Creator',
          foreignKey: {
            allowNull: false,
            name: 'createdBy'
          }
        });
        Card.belongsTo(models.Board, {
          as: 'Board',
          foreignKey: {
            allowNull: false,
            name: 'attachedTo'
          }
        });
      }
    }
  });

  return Card;
};
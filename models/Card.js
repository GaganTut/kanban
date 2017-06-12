module.exports = function(sequelize, DataTypes) {
  let Card = sequelize.define("Card", {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Queue', 'Progress', 'Completed'),
      allowNull: false
    },
    priority: {
      type: DataTypes.ENUM('Urgent', 'High', 'Medium', 'Low'),
      allowNull: false
    }
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
        Card.belongsTo(models.User, {
          as: 'Assigned',
          foreignKey: {
            name: 'assignedTo'
          }
        });
        Card.belongsTo(models.Board, {
          as: 'Board',
          foreignKey: {
            name: 'attachedTo'
          }
        });
      }
    }
  });

  return Card;
};
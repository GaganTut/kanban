module.exports = function(sequelize, DataTypes) {
  var BoardUser = sequelize.define("BoardUser", {
    permission: {
      type: DataTypes.ENUM('Owner', 'Worker', 'Viewer'),
      allowNull: false
    }
  });
  return BoardUser;
};
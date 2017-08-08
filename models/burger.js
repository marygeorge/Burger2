module.exports = function(sequelize, DataTypes) {
  var SecondBurger = sequelize.define("SecondBurger", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eaten: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:0,
    }
  });

  return SecondBurger;
};

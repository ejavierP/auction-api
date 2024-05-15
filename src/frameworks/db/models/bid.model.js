module.exports = (sequelize, DataTypes) => {
  const BidModel = sequelize.define(
    "Bid",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      createdDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "bid",
      timestamps: false,
    }
  );

  return BidModel;
};

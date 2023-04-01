/* eslint-disable no-magic-numbers */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TB_REVENUE_TRANSACTION extends Model {
    static associate(models) {}
  }

  TB_REVENUE_TRANSACTION.init(
    {
      TRANSACTION_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      PAYMENT_REF: DataTypes.STRING,
      REVENUE_ID: DataTypes.STRING,
      RECIPIENT_ID: DataTypes.STRING,
      SHARE_BY: DataTypes.STRING,
      REVENUE_AMOUNT: DataTypes.FLOAT,
      PG_FEE: DataTypes.FLOAT,
      PG_FEE_VAT: DataTypes.FLOAT,
      TRANSFER_ID: DataTypes.STRING,
      CREATE_DATE: DataTypes.DATE,
      UPDATE_DATE: DataTypes.DATE,
    },
    {
      timestamps: false,
      sequelize,
      createdAt: "CREATE_DATE",
      updatedAt: "UPDATE_DATE",
      modelName: "TB_REVENUE_TRANSACTION",
      tableName: "TB_REVENUE_TRANSACTION",
    }
  );

  return TB_REVENUE_TRANSACTION;
};

/* eslint-disable no-magic-numbers */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TB_OPS_TRANSACTION extends Model {
    static associate(models) {}
  }

  TB_OPS_TRANSACTION.init(
    {
      PAYMENT_REF: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      MERCH_ID: DataTypes.STRING,
      ORDER_ID: DataTypes.STRING,
      AMOUNT: DataTypes.FLOAT,
      PAY_OPTION: DataTypes.STRING,
      ACQUIRING_BANK : DataTypes.STRING,
      BANK_FEE : DataTypes.FLOAT,
      BANK_FEE_VAT : DataTypes.FLOAT,
      PG_FEE: DataTypes.FLOAT,
      PG_FEE_VAT: DataTypes.FLOAT,
      PG_FEE_REVENUE: DataTypes.FLOAT,
      TOTAL_PG_FEE: DataTypes.FLOAT,
      TOTAL_ALLOT_AMOUNT : DataTypes.FLOAT,
      REVENUE_FLAG: DataTypes.STRING,
      TRANSACTION_DATE: DataTypes.STRING,
      TRANSACTION_TIME: DataTypes.STRING,
      CREATE_DATE: DataTypes.DATE,

    },
    {
      timestamps: false,
      sequelize,
      createdAt: "CREATE_DATE",
      modelName: "TB_OPS_TRANSACTION",
      tableName: "TB_OPS_TRANSACTION",
    }
  );

  return TB_OPS_TRANSACTION;
};

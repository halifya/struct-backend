/* eslint-disable no-magic-numbers */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TB_RECIPIENT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      //
    }
  }

  TB_RECIPIENT.init(
    {
      RECIPIENT_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      MERCH_ID: DataTypes.STRING,
      TYPE: DataTypes.STRING,
      NAME: DataTypes.STRING,
      EMAIL: DataTypes.STRING,
      ACCOUNT_NO: DataTypes.STRING,
      BANK_CODE: DataTypes.STRING,
      BRANCH_CODE: DataTypes.STRING,
      CREATE_DATE: DataTypes.DATE,
      UPDATE_DATE: DataTypes.DATE,
    },
    {
      timestamps: false,
      sequelize,
      createdAt: "CREATE_DATE",
      updatedAt: "UPDATE_DATE",
      modelName: "TB_RECIPIENT",
      tableName: "TB_RECIPIENT",
    }
  );

  return TB_RECIPIENT;
};

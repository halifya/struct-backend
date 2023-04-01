/* eslint-disable no-magic-numbers */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TB_ADMIN extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      //
    }
  }

  TB_ADMIN.init(
    {
      // RECIPIENT_ID: {
      //   type: DataTypes.STRING,
      //   primaryKey: true,
      // },
      EMAIL: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      CREATE_DATE: DataTypes.DATE,
      UPDATE_DATE: DataTypes.DATE,
    },
    {
      timestamps: false,
      sequelize,
      createdAt: "CREATE_DATE",
      updatedAt: "UPDATE_DATE",
      modelName: "TB_ADMIN",
      tableName: "TB_ADMIN",
    }
  );

  return TB_ADMIN;
};

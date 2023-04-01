/* eslint-disable no-magic-numbers */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TB_MEMBER extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      //
    }
  }

  TB_MEMBER.init(
    {
      RECIPIENT_ID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      EMAIL: DataTypes.STRING,
      CREATE_DATE: DataTypes.DATE,
      UPDATE_DATE: DataTypes.DATE,
    },
    {
      timestamps: false,
      sequelize,
      createdAt: "CREATE_DATE",
      updatedAt: "UPDATE_DATE",
      modelName: "TB_MEMBER",
      tableName: "TB_MEMBER",
    }
  );

  return TB_MEMBER;
};

/* eslint-disable no-magic-numbers */
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class To_RPA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      //
    }

  }

  To_RPA.init(
    {
      customer_id: DataTypes.STRING,
      customer_name: DataTypes.STRING,
      invoice_no: DataTypes.STRING,
      debt_balance: DataTypes.STRING,
      date_transfer: DataTypes.STRING,
      bank_code: DataTypes.STRING,
      transfer_amount: DataTypes.STRING,
      tax_base: DataTypes.STRING,
      tax_code: DataTypes.STRING,
      wht: DataTypes.STRING,
      add_GL: DataTypes.STRING,
      Price_GL: DataTypes.STRING,
      discount: DataTypes.STRING,
      add_GL_Fee: DataTypes.STRING,
      Price_GL_Fee: DataTypes.STRING,
      add_GL_Diff: DataTypes.STRING,
      Price_GL_Diff: DataTypes.STRING,
      result_response: DataTypes.STRING,
      remark: DataTypes.STRING,
      hook_from_rpa: DataTypes.STRING,
      so_number: DataTypes.STRING,
      sc_number: DataTypes.STRING,
      sv_number: DataTypes.STRING,
      Amortize_Month: DataTypes.STRING,
      start_period: DataTypes.STRING,
      End_period: DataTypes.STRING,
      date_pay: DataTypes.STRING,
      date_invoice: DataTypes.STRING,
      data: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "To_RPA",
      tableName: 'To_RPAs',
    }
  );

  return To_RPA;
};

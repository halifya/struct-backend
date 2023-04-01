/* eslint-disable import/order */
const { sequelize, DataTypes } = require("../configs/databases");

const TB_RECIPIENT = require("./TB_RECIPIENT")(sequelize, DataTypes);
const TB_REVENUE_TRANSACTION = require("./TB_REVENUE_TRANSACTION")(sequelize, DataTypes);
const TB_OPS_TRANSACTION = require("./TB_OPS_TRANSACTION")(sequelize, DataTypes);
const TB_MEMBER = require("./TB_MEMBER")(sequelize, DataTypes)
const TB_ADMIN = require("./TB_ADMIN")(sequelize, DataTypes)

const models = {
  TB_RECIPIENT,
  TB_REVENUE_TRANSACTION,
  TB_OPS_TRANSACTION,
  TB_MEMBER,
  TB_ADMIN
};

Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

// eslint-disable-next-line node/no-unsupported-features/es-syntax
module.exports = { ...models, sequelize };

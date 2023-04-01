const { Sequelize, DataTypes } = require("sequelize");

const config = require("./app");

const databases = {
  mssql() {
    const { dbHost, dbName, dbUsername, dbPassword } = config;

    Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
      return this._applyTimezone(date, options).format(
        "YYYY-MM-DD HH:mm:ss.SSS"
      );
    };

    const connection = new Sequelize(
      dbName,
      dbUsername,
      dbPassword,
      {
        host: dbHost,
        dialect: "mssql",
        timezone: "Asia/Bangkok",
        logging: false,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions: {
          options: { requestTimeout: 120000 },
        },
        timezone: "+7.00",
      },
      {
        define: {
          charset: "utf8",
          timestamps: true,
        },
      }
    );

    connection
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });

    return connection;
  },
};

module.exports = {
  sequelize: databases.mssql(),
  DataTypes,
};

/* eslint-disable no-magic-numbers */
/* eslint-disable radix */
const crypto = require("crypto");

const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");

const config = require("../configs/app");

const { getMessages } = require("../configs/getMessages");
const { UNIQUE_FIELD, NOT_NULL } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {}

    generateJWT() {
      const today = new Date();
      const exp = new Date(today);
      exp.setMinutes(today.getMinutes() + 30);

      return jwt.sign(
        {
          id: this.id,
          username: this.username,
          expiresIn: "365d",
        },
        config.secret
      );
    }

    toJSON() {
      return {
        id: this.id,
        username: this.username,
        name: this.name,
        email: this.email,
        birthday: this.birthday,
        avatar: this.avatar,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }

    // Hash Password
    passwordHash(password) {
      return crypto.createHash("sha1").update(password).digest("hex");
    }

    // Verify Password
    validPassword(password) {
      return this.passwordHash(password) === this.password;
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          msg: getMessages(NOT_NULL, ["name"]),
        },
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
          isEmail: true,
        },
        unique: {
          msg: getMessages(UNIQUE_FIELD, ["email"]),
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: getMessages(UNIQUE_FIELD, ["username"]),
        },
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          msg: getMessages(NOT_NULL, ["password"]),
        },
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  User.beforeCreate(async (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = await user.passwordHash(user.password);
  });

  return User;
};

/* eslint-disable global-require */
const path = require("path");

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const responseFormat = require("./responseFormat");

const timeout = require("connect-timeout"); //express v4

module.exports = async (app) => {
  // Connect Database
  require("./databases");

  // CORS
  // const allowedOrigins = ['http://localhost:19006/', '*'];
  // const corsOptions = {
  //     origin(origin, callback) {
  //         if (!origin) {
  //             return callback(null, true);
  //         }
  //         if (allowedOrigins.indexOf(origin) === -1) {
  //             const msg =
  //                 'The CORS policy for this site does not ' +
  //                 'allow access from the specified Origin.';

  //             return callback(new Error(msg), false);
  //         }

  //         return callback(null, true);
  //     },
  // };

  app.use(cors());

  // Parser Body
  app.use(express.json({ limit: "50mb" }));

  app.use(timeout(120000));


  app.use(express.urlencoded({ extended: false }));

  // Logger
  app.use(morgan("dev"));

  // Static file
  app.use("/static", express.static(path.join(__dirname, "../public")));

  // Custom Response Format
  app.use(responseFormat);
};

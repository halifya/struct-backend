const { Parser } = require("json2csv");
const _ = require("lodash");
const { Error } = require("sequelize");
const XLSX = require("xlsx");
const ExcelContents = require("./excelContents");
const revenueFormGenerator = (req) => {
  try {
    const data = req;
    if (!data.rows.length) {
      // CHECK AMPTY DATA
      const error = new Error("Not found information");
      error.status = 400;
      throw error;
    }
    const header = ExcelContents.Header(data);
    const content = ExcelContents.Content(data.rows);
    const footer = ExcelContents.Footer();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(content);
    const newCsv = csv.replace(/"/g, "");
    const sum = header + "\n" + newCsv + "\n" + footer;
    const wb = XLSX.read(sum, { type: "string" });
    const ws = wb.Sheets["Sheet1"];

    Object.keys(ws).forEach((key) => {
      const row = parseInt(key.slice(1));
      if (_.startsWith(key, "E") && row >= 9) {
        ws[key].z = "0";
        delete ws[key].w; // delete old formatted text if it exists
        XLSX.utils.format_cell(ws[key]); // refresh cell
      }
    });

    Object.keys(ws).forEach((key) => {
      const row = parseInt(key.slice(1));
      if (_.startsWith(key, "B") && row >= 9) {
        delete ws[key].w; // delete old formatted n if it exists
        ws[key].z = "mm/dd/yyyy"; // vacate the formatted text and add the desired number format and refresh cell
      }
    });

    Object.keys(ws).forEach((key) => {
      const row = parseInt(key.slice(1));
      if (_.startsWith(key, "F") && row == 3) {
        delete ws[key].w; // delete old formatted n if it exists
        ws[key].z = "mm/dd/yyyy"; // vacate the formatted text and add the desired number format and refresh cell
      }
    });

    const str = XLSX.write(wb, { bookType: "xlsx", type: "base64" }); // generate a binary

    return (
      "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
      str
    );
  } catch (error) {
    throw error;
  }
};

const withdrawFormGenerator = (req) => {
  try {
    const data = req;
    if (!data.rows.length) {
      const error = new Error("Not found information");
      error.status = 400;
      throw error;
    }
    const header = ExcelContents.Header(data);
    const content = ExcelContents.Content(data.rows);
    const footer = ExcelContents.Footer();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(content);
    const newCsv = csv.replace(/"/g, "");
    const sum = header + "\n" + newCsv + "\n" + footer;
    const wb = XLSX.read(sum, { type: "string" });
    const ws = wb.Sheets["Sheet1"];

    Object.keys(ws).forEach((key) => {
      // set format rows >= E9
      const row = parseInt(key.slice(1));
      if (_.startsWith(key, "E") && row >= 9) {
        ws[key].z = "0";
        delete ws[key].w; // delete old formatted text if it exists
        XLSX.utils.format_cell(ws[key]); // refresh cell
      }
    });
    Object.keys(ws).forEach((key) => {
      // set format rows >= B9
      const row = parseInt(key.slice(1));
      if (_.startsWith(key, "B") && row >= 9) {
        delete ws[key].w; // delete old formatted n if it exists
        ws[key].z = "mm/dd/yyyy"; // vacate the formatted text and add the desired number format and refresh cell
      }
    });
    Object.keys(ws).forEach((key) => {
      // set format rows == F3
      const row = parseInt(key.slice(1));
      if (_.startsWith(key, "F") && row == 3) {
        delete ws[key].w; // delete old formatted n if it exists
        ws[key].z = "mm/dd/yyyy"; // vacate the formatted text and add the desired number format and refresh cell
      }
    });

    const str = XLSX.write(wb, { bookType: "xlsx", type: "base64" }); // generate a base64

    return (
      "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," +
      str
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { revenueFormGenerator, withdrawFormGenerator };

const PDFMake = require("pdfmake");
const moment = require("moment");
const PDFcontents = require("./pdfContents");
const pdfFonts = require("./pdfFonts");

const revenueFormGenerator = (data) => {
  try {
    const currentDate = moment().tz("Asia/Bangkok").format("YYYY/MM/DD");
    const PDF = new PDFMake(pdfFonts);
    const doc = PDF.createPdfKitDocument({
      pageSize: "A4",
      info: {
        title: `Revenues Report`,
        author: "Revenues Report",
        subject: `Revenues Report`,
      },
      pageMargins: [40, 40, 40, 40],
      defaultStyle: {
        font: "THSarabunNew",
      },
      pageOrientation: "landscape",
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: "เวลา CutOff 22.00 น.",
              alignment: "left",
              margin: [10, 10, 10, 10],
              fontSize: "12",
              float: "left",
            },
            {
              text: currentPage.toString() + " จาก " + pageCount,
              alignment: "right",
              margin: [10, 10, 10, 10],
              fontSize: "12",
              float: "right",
            },
          ],
        };
      },
      content: PDFcontents.revenueExport({ currentDate, ...data }), // pass user data
    });
    return doc;
  } catch (error) {
    return null;
  }
};

const withdrawFormGenerator = (data) => {
  try {
    const currentDate = moment().tz("Asia/Bangkok").format("YYYY/MM/DD");
    const PDF = new PDFMake(pdfFonts);
    const doc = PDF.createPdfKitDocument({
      pageSize: "A4",
      info: {
        title: `Withdraw Report`,
        author: "Withdraw Report",
        subject: `Withdraw Report`,
      },
      pageMargins: [40, 40, 40, 40],
      defaultStyle: {
        font: "THSarabunNew",
      },
      pageOrientation: "landscape",
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: "เวลา CutOff 22.00 น.",
              alignment: "left",
              margin: [10, 10, 10, 10],
              fontSize: "12",
              float: "left",
            },
            {
              text: currentPage.toString() + " จาก " + pageCount,
              alignment: "right",
              margin: [10, 10, 10, 10],
              fontSize: "12",
              float: "right",
            },
          ],
        };
      },
      content: PDFcontents.withdrawExport({ currentDate, ...data }), // pass user data
    });
    return doc;
  } catch (error) {
    return null;
  }
};

module.exports = { revenueFormGenerator, withdrawFormGenerator };

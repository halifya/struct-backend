const _ = require("lodash");
const dayjs = require("dayjs");
const currencyFormatter = require("currency-formatter");
const genTransaction = (data) =>
  _.map(data, (_data, index) => [
    {
      text: index + 1,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "center",
    },
    {
      text: `${dayjs(_data.TRANSACTION_DATE).format("DD/MM/BBBB") || "-"}`,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "center",
    },
    {
      text: `${
        dayjs(
          _data.TRANSACTION_DATE + _data.TRANSACTION_TIME,
          "YYYYMMDDHHmmss"
        ).format("HH:mm:ss") || "-"
      }`,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "center",
    },
    {
      text: `${_data.PAYMENT_REF || "-"}`,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "center",
    },
    {
      text: `${_data.ORDER_ID || "-"}`,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "center",
    },
    {
      text: `${
        currencyFormatter.format(_data.REVENUE_AMOUNT, { code: "" }) || "-"
      }`,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "right",
    },
    // {
    //   text: `${
    //     currencyFormatter.format(_data.REVENUE_AMOUNT, { code: "" }) || "-"
    //   }`,
    //   border: [true, false, true, true],
    //   fontSize: 12,
    //   colSpan: 1,
    //   alignment: "right",
    // },
    // {
    //   text: `${_data.TRANSFER_ID || "-"}`,
    //   colSpan: 1,
    //   fontSize: 12,
    //   alignment: "center",
    // },
  ]);


const revenueExport = (data) => {
  const rows = genTransaction(data.rows);
  return [
    {
      text: `${data.title}`,
      fontSize: "18",
      bold: true,
    },
    {
      alignment: "justify",
      columns: [
        // {
        //   width: "10%",
        //   text: `เลขที่โอนเงิน :`,
        //   fontSize: "14",
        // },
        // {
        //   width: "35%",
        //   text: `${transaction_id ? transaction_id : "-"} `,
        //   fontSize: "14",
        // },
        // {
        //   width: "10%",
        //   text: `วันที่โอนเงิน :`,
        //   fontSize: "14",
        // },
        // {
        //   text: `${
        //     newRows[0]?.TRANSFER_DATE
        //       ? dayjs(newRows[0].TRANSFER_DATE).format("DD/MM/BBBB")
        //       : "-"
        //   }`,
        //   fontSize: "14",
        // },
      ],
      columnGap: 0,
    },
    {
      text: `\n`,
      fontSize: "12",
    },
    {
      alignment: "justify",
      columns: [
        {
          width: "10%",
          text: `ชื่อร้านค้า :`,
          fontSize: "14",
        },
        {
          text: data.recipient
          ? `${data.recipient.NAME} (${data.recipient.MERCH_ID}) `
          : `-`,
          fontSize: "14",
        },
      ],
      columnGap: 0,
    },
    {
      alignment: "justify",
      columns: [
        {
          width: "12%",
          text: `รายการรับเงินทั้งหมด :`,
          fontSize: "14",
        },
        {
          width: "33%",
          text: `${data.total} รายการ`,
          fontSize: "14",
        },
        // {
        //   width: "12%",
        //   text: `รายการโอนเงินทั้งหมด :`,
        //   fontSize: "14",
        // },
        // {
        //   width: "25%",
        //   text: `${countList} รายการ`,
        //   fontSize: "14",
        // },
      ],
      columnGap: 0,
    },
    {
      alignment: "justify",
      columns: [
        {
          width: "10%",
          text: `ยอดรับเงินทั้งหมด :`,
          fontSize: "14",
        },
        {
          width: "35%",
          text: `${currencyFormatter.format(data.total_amount, {
            code: "",
          })} บาท`,
          fontSize: "14",
        },
        // {
        //   width: "11%",
        //   text: `ยอดโอนเงินทั้งหมด :`,
        //   fontSize: "14",
        // },
        // {
        //   width: "25%",
        //   text: `${currencyFormatter.format(totalAmount, {
        //     code: "",
        //   })} บาท`,
        //   fontSize: "14",
        // },
      ],
      columnGap: 0,
    },
    {
      text: `\nรายละเอียดการรับเงิน `,
      fontSize: "14",
      bold: true,
    },
    {
      image: data.logo,
      height: 100,
      width: 100,
      absolutePosition: { x: 665, y: 15 },
    },
    {
      margin: [0, 5, 30, 0],
      style: "tableExample",
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex === 0 ? "#BFBFBF" : null;
        },
      },
      table: {
        widths: ["10%", "20%", "15%", "21%", "21%", "20%", "*", "*"],
        heights: [15],
        headerRows: 1,
        body: [
          [
            {
              text: "รายการ",
              colSpan: 1,
              fontSize: 12,
              bold: true,
              alignment: "center",
            },
            {
              text: "วันที่รับเงิน",
              colSpan: 1,
              fontSize: 12,
              bold: true,
              alignment: "center",
            },
            {
              text: "เวลา",
              colSpan: 1,
              fontSize: 12,
              bold: true,
              alignment: "center",
            },
            {
              text: "เลขที่ชำระเงิน",
              colSpan: 1,
              fontSize: 12,
              bold: true,
              alignment: "center",
            },
            {
              text: "เลขที่คำสั่งรับเงิน",
              colSpan: 1,
              fontSize: 12,
              bold: true,
              alignment: "center",
            },
            {
              text: "ยอดรับชำระเงิน",
              colSpan: 1,
              fontSize: 12,
              bold: true,
              alignment: "center",
            },
            // {
            //   text: "ยอดโอนเงินคืน",
            //   colSpan: 1,
            //   fontSize: 12,
            //   bold: true,
            //   alignment: "center",
            // },
            // {
            //   text: "เลขที่โอนเงิน",
            //   colSpan: 1,
            //   fontSize: 12,
            //   bold: true,
            //   alignment: "center",
            // },
          ],
          ...rows,
        ],
      },
    },
  ];
};

module.exports = revenueExport;

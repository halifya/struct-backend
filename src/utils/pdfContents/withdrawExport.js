const _ = require("lodash");

const dayjs = require("dayjs");
const buddhistEra = require("dayjs/plugin/buddhistEra");
dayjs.extend(buddhistEra);
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
        currencyFormatter.format(_data.REVENUE_AMOUNT, { code: "" }) || "-" // นำค่าจากยอดโอนเงินคืนมาใช้ได้เลย
      }`,
      border: [true, false, true, true],
      fontSize: 12,
      colSpan: 1,
      alignment: "right",
    },
    // {
    //   text: `${
    //     currencyFormatter.format(_data.REVENUE_AMOUNT, { code: "" }) || "-" // REVERT
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

const detailPDF = (
  data,
  countList,
  totalAmount,
  transaction_id,
  newRows,
  currentPage,
  lastPage
) => {
  const rows = genTransaction(newRows);
  const detail_pdf = [
    {
      text: `${data.title}`,
      fontSize: "18",
      bold: true,
    },
    {
      alignment: "justify",
      columns: [
        {
          width: "10%",
          text: `เลขที่โอนเงิน :`,
          fontSize: "14",
        },
        {
          width: "35%",
          text: `${transaction_id ? transaction_id : "-"} `,
          fontSize: "14",
        },
        {
          width: "10%",
          text: `วันที่โอนเงิน :`,
          fontSize: "14",
        },
        {
          text: `${
            newRows[0]?.TRANSFER_DATE
              ? dayjs(newRows[0].TRANSFER_DATE).format("DD/MM/BBBB")
              : "-"
          }`,
          fontSize: "14",
        },
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
          text: `${countList} รายการ`,
          fontSize: "14",
        },
        {
          width: "12%",
          text: `รายการโอนเงินทั้งหมด :`,
          fontSize: "14",
        },
        {
          width: "25%",
          text: `${countList} รายการ`,
          fontSize: "14",
        },
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
          text: `${currencyFormatter.format(totalAmount, {
            code: "",
          })} บาท`,
          fontSize: "14",
        },
        {
          width: "11%",
          text: `ยอดโอนเงินทั้งหมด :`,
          fontSize: "14",
        },
        {
          width: "25%",
          text: `${currencyFormatter.format(totalAmount, {
            code: "",
          })} บาท`,
          fontSize: "14",
        },
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
    currentPage === lastPage
      ? {}
      : {
          text: "",
          pageBreak: "after",
        },
  ];
  return detail_pdf;
};
const withdrawExport = (data) => {
  const group_tranfer_id = data.group_tranfer_id;
  const rows = data.rows;
  const index_group_tranfer_id = group_tranfer_id.length;
  var detail = [];
  for (const id in group_tranfer_id) {
    const newRows = rows.filter(
      (element) => element.TRANSFER_ID === group_tranfer_id[id].TRANSFER_ID
    );

    const countList = newRows.length;
    let sum = 0;
    for (const index in newRows) {
      //  คำนวนยอดเงิน
      sum = sum + newRows[index].REVENUE_AMOUNT;
    }

    const handledata = detailPDF(
      data,
      countList,
      sum,
      group_tranfer_id[id].TRANSFER_ID,
      newRows,
      parseInt(id),
      index_group_tranfer_id - 1
    );
    detail.push(handledata);
  }

  return detail;
};

module.exports = withdrawExport;

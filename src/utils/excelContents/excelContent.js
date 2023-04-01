const dayjs = require("dayjs");
const Content = (req) => {
  const data = req;
  const newData = data.map((element, index) => {
    return {
      รายการ: index + 1,
      วันที่รับเงิน: dayjs(element.TRANSACTION_DATE).format("DD/MM/BBBB") || "-",
      เวลา: dayjs(element.TRANSACTION_DATE + element.TRANSACTION_TIME, "YYYYMMDDHHmmss" ).format("HH:mm:ss") || "-",
      เลขที่ชำระเงิน: element.PAYMENT_REF,
      เลขที่คำสั้งรับเงิน: element.ORDER_ID,
      ยอดชำระเงิน: element.REVENUE_AMOUNT,
      ยอดโอนเงินคืน: element.REVENUE_AMOUNT,
      เลขที่โอนเงิน: element.TRANSFER_ID || '-',
    };
  });
  return newData;
};
module.exports = Content;

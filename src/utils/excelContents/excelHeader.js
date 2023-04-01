const dayjs = require("dayjs");
// const currencyFormatter = require("currency-formatter");
const Header = (req) => {
  const title = req.title;
  const patmentDate =
    dayjs(req.start_date).format("DD/MM/BBBB") +
    "-" +
    dayjs(req.end_date).format("DD/MM/BBBB");

  const tranferDate = `${
    req.rows[0]?.TRANSFER_DATE
      ? dayjs(req.rows[0].TRANSFER_DATE).format("DD/MM/BBBB")
      : "-"
  }`;
  const name = req.recipient
    ? `${req.recipient.NAME} (${req.recipient.MERCH_ID}) `
    : `-`;
  const allReceipts = req.total;
  const allTransfers = req.total;
  const totalAmount = req.total_amount || "-";
  const totalTransferAmount = req.total_transfer_amount || "-";
  const header = `${title},,,,,,,
,,,,,,,
วันที่รับเงิน: ${patmentDate},,,,วันที่โอนเงิน:,${tranferDate},,
ชื่อร้านค้า: ${name} ,,,,,,,
รายการรับเงินทั้งหมด: ${allReceipts} รายการ,,,,รายการโอนเงินทั้งหมด: ${allTransfers} รายการ,,,
ยอดรับเงินทั้งหมด: ${totalAmount} บาท,,,,ยอดโอนเงินทั้งหมด: ${totalAmount} บาท,,,\n`;
  return header;
};
module.exports = Header;

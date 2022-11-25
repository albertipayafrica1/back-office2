// amount: "-200.000";
// channel: "BANKCOST";
// createdAt: "2018-07-09 00:00:00";
// currency: "KES";
// discount: "0.000";
// email: "";
// firstName: "";
// lastName: "";
// mask: "";
// msisdn: "";
// narration: "";
// running_balance: -4000;
// senderNumber: "EFT";
// transactionCode: "5KESBANKCOST";
// vendorid: "";

const payinsColumns = (detailsOnClick) => [
  { id: "createdAt", label: "Date", minWidth: 170 },
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "firstName",
    label: "Customer",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "channel",
    label: "Channel",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "transactionCode",
    label: "Transaction\u00a0Id",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "senderNumber",
    label: "Category",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "",
    label: "Details",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
    formatting: { cursor: "pointer" },
    onClick: detailsOnClick,
  },
];

const payoutsColumns = (detailsOnClick) => [
  { id: "dttime", label: "Date", minWidth: 170 },
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "",
    label: "Account Id",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "channel",
    label: "Channel",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ref",
    label: "Transaction\u00a0Id",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "",
    label: "Platform",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "cr",
    label: "Amount",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "",
    label: "Details",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
    formatting: { cursor: "pointer" },
    onClick: detailsOnClick,
  },
];

const billingColumns = (detailsOnClick) => [
  { id: "created", label: "Date", minWidth: 170 },
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "account",
    label: "Account",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ipayRef",
    label: "Transaction Id",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "biller_name",
    label: "Biller",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "commission",
    label: "Earnings",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "",
    label: "Details",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
    formatting: { cursor: "pointer" },
    onClick: detailsOnClick,
  },
];

export const tableColumnSwitcher = (name, detailsOnClick) => {
  switch (name) {
    case "payins":
      return payinsColumns(detailsOnClick);
    case "payouts":
      return payoutsColumns(detailsOnClick);
    case "billing":
      return billingColumns(detailsOnClick);
    default:
      return payinsColumns(detailsOnClick);
  }
};

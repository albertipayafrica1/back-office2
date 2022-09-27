const payinsColumns = (detailsOnClick) => [
  { id: "receivingdatetime", label: "Date", minWidth: 170 },
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "fname",
    label: "Customer",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "channeltype",
    label: "Channel",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "txncode",
    label: "Transaction\u00a0Id",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "sendernumber",
    label: "Category",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "txnamt",
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

export const settlementColumns = [
  { id: "date", label: "Date", minWidth: 170 },
  // { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "channel",
    label: "Channel",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "transferChages",
    label: "Transfer Charge",
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
    id: "commision",
    label: "Commission",
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
    id: "details",
    label: "Details",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
    formatting: { cursor: "pointer" },
  },
];

const payoutsColumns = [];

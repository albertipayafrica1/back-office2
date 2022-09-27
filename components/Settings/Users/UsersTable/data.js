export const userColumns = [
  { id: "", label: "full Name", minWidth: 170 },
  {
    id: "",
    label: "Email",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "",
    label: "Role",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "",
    label: "Actions",
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
  },
];

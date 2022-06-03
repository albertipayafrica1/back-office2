import * as XLSX from "xlsx/xlsx.mjs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// get data in the shape needed for all these functions

export const downloadExcel = (data) => {
  //   const newData = studentData.map((row) => {
  //     delete row.tableData;
  //     return row;
  //   });
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "students");
  XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  XLSX.writeFile(workBook, "ipay.xlsx");
};

export const downloadCsv = (data) => {
  const workSheet = XLSX.utils.json_to_sheet(data);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, "students");
  XLSX.write(workBook, { bookType: "csv", type: "buffer" });
  XLSX.write(workBook, { bookType: "csv", type: "binary" });
  XLSX.writeFile(workBook, "ipay.csv");
};

export const downloadPdf = (columns, rows) => {
  /* eslint-disable */
  const doc = new jsPDF();
  doc.text("ipay", 20, 10);
  doc.autoTable({
    theme: "grid",
    // columns: columns.map((col) => ({ ...col, dataKey: col.field })),
    // body: rows,
    head: [["Name", "Email", "Country"]],
    body: [
      ["David", "david@example.com", "Sweden"],
      ["Castille", "castille@example.com", "Spain"],
      // ...
    ],
    styles: { fillColor: [255, 0, 0] },
  });
  doc.save("ipay.pdf");
};

import React from "react";
import { Button } from "reactstrap";
import JsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import * as XLSX from "xlsx/xlsx.mjs";

export const getExportFileBlob = ({ columns, data, fileType, fileName }) => {
  if (fileType === "csv") {
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") {
    const header = columns.map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
    return false;
  }

  if (fileType === "pdf") {
    const headerNames = columns.map((column) => column.exportValue);
    const page = {
      layout: "l", //p=portrait, l=landscape
      papersize: {
        height: 297.0, //330.2mm
        width: 210.0, //215.9mm
        unit: "mm",
      },
    };
    const doc = new JsPDF(page.layout, page.papersize.unit, [
      page.papersize.width,
      page.papersize.height,
    ]);
    doc.autoTable({
      orientation: "landscape",
      head: [headerNames],
      body: data,
      format: [4, 2],
      margin: { top: 10 },
      styles: {
        minCellHeight: 9,
        halign: "left",
        valign: "center",
        fontSize: 8,
      },
    });

    doc.save(`${fileName}.pdf`);
    return false;
  }

  return false;
};

const ButtonExport = (props) => {
  const BtnExportCSV = () => {
    return (
      <Button
        name={`BtnExportCSV-${props.name}`}
        disabled={props.pageOptions.length > 0 ? false : true}
        onClick={() => props.exportData("csv", false)}
        className="btn btn-indigo btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Exportar para arquivo csv."
      >
        <i className="fa fa-file-csv" />
      </Button>
    );
  };
  const BtnExportPDF = () => {
    return (
      <Button
        name={`BtnExportPDF-${props.name}`}
        disabled={props.pageOptions.length > 0 ? false : true}
        onClick={() => props.exportData("pdf", false)}
        className="btn btn-primary btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Exportar para arquivo pdf."
      >
        <i className="fa fa-file-pdf" />
      </Button>
    );
  };
  const BtnExportXLSX = () => {
    return (
      <Button
        name={`BtnExportXLSX-${props.name}`}
        disabled={props.pageOptions.length > 0 ? false : true}
        onClick={() => props.exportData("xlsx", false)}
        className="btn btn-info btn-icon btn-circle btn-lg me-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Exportar para arquivo xls."
      >
        <i className="fa fa-file-excel" />
      </Button>
    );
  };

  return (
    <React.Fragment>
      <ul className="nav px-1 py-1 ">
        <li>
          <div className="d-flex flex-row ">
            <BtnExportCSV />
            <BtnExportPDF />
            <BtnExportXLSX />
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default ButtonExport;

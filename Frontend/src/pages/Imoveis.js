import React  from "react";
import { Link } from "react-router-dom";
import { COLUMNS_IMOVEIS } from "../components/table-column/columns";
import MOCK_DATA from '../components/MOCK_DATA.json'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import TableFilter from '../components/table-filter/table-filter'
import FormImovel from '../components/forms/form-imovel'
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";

import * as XLSX from 'xlsx/xlsx.mjs';
import JsPDF from "jspdf";
import "jspdf-autotable";

function Imoveis() {

  const columns = React.useMemo(() => COLUMNS_IMOVEIS, []);
  const data = React.useMemo(() => MOCK_DATA, []);

  const getExportFileBlob = ({ columns, data, fileType, fileName }) => {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") {
    // XLSX example

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

    // Returning false as downloading of file is already taken care of
    return false;
  }
  //PDF example
  if (fileType === "pdf") {
    const headerNames = columns.map((column) => column.exportValue);
    const page = {
      layout: 'l', //p=portrait, l=landscape
      papersize: {
        height: 297.0, //330.2mm
        width: 210.0, //215.9mm
        unit: 'mm'
      }
    }
    const doc = new JsPDF(page.layout, page.papersize.unit, [page.papersize.width, page.papersize.height]);
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

  // Other formats goes here
  return false;
}

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,    
    preGlobalFilteredRows,
    setGlobalFilter,
    exportData,
  } = useTable({
    columns,
    data,
    getExportFileBlob,
    initialState: { pageIndex: 0 },
  },
    useGlobalFilter,
    usePagination,
    useExportData
  );
  const { pageIndex, pageSize } = state

  return (
    <div>
      <ToastContainer position="top-center" newestOnTop/>
      <div className="d-flex align-items-center mb-3">
        <div>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/app">Principal</Link>
            </li>
            <li className="breadcrumb-item active">Imoveis</li>
          </ul>
          <h2 className="page-header mb-0"><strong><span class='fa-stack fa-lg'>
            <i className='fas fa-circle fa-stack-2x'></i>
            <i className='fa fa-home fa-stack-1x fa-inverse'></i>
          </span>Imóveis</strong></h2>
        </div>
      </div>
      <div className="card border-0">
        <ul className="nav px-3 py-3 ">
          <button type="button" onClick={() => exportData("csv", false)} className="btn btn-indigo btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-csv"></i>
          </button>
          <button type="button" onClick={() => exportData("pdf", false)} className="btn btn-primary btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-pdf"></i>
          </button>
          <button type="button" onClick={() => exportData("xlsx", false)} className="btn btn-info btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-excel"></i>
          </button>
          <li className="nav-item me-2 ms-auto">           
            <FormImovel isModal={false} isUpdated={false} isId={''} />
          </li>
        </ul>
        <div className="tab-content p-4">
          <div className="tab-pane fade show active" id="allTab">
            <TableFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
            <div className="table-responsive mb-3">
              <table {...getTableProps()}  className="table table-hover table-panel text-nowrap align-middle mb-0 table-sm">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row)
                    return (
                      <tr className={i % 2 !== 0 ? "table-active": ''} {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>
                            <span className="fw-bold" >{cell.render('Cell')}</span>
                          </td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="d-md-flex align-items-center">
              <div className="me-md-auto text-md-left text-center mb-2 mb-md-0">
                Mostrando {pageIndex + 1} até {pageSize} com o total de {pageOptions.length} registros               
              </div>
              <button type="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button type="button" onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-left"></i>
              </button>
              <button type="button" onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-right"></i>
              </button>
              <button type="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-double-right"></i>
              </button>           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imoveis
import React from "react";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useTable,
} from "react-table";
import { Table } from "reactstrap";
import { COLUMNS_IMOVEIS } from "components/ui/table-column/table-column";
import { useExportData } from "react-table-plugins";

import FormImovel from "components/forms/form-imovel/form-imovel";
import FormImovelDetalhe from "components/forms/form-imovel-detalhe/form-imovel-detalhe";
import FormImovelImagem from "components/forms/form-imovel-imagem/form-imovel-imagem";

import ButtonExport, {
  getExportFileBlob,
} from "components/ui/button-export/button-export";
import BreadcrumbIcon from "components/ui/breadcrumb-icon/breadcrumb-icon";
import AlertDelete from "components/ui/alert-delete/alert-delete";
import TableFilter from "components/ui/table-filter/table-filter";
import TablePagination from "components/ui/table-pagination/table-pagination";
import { useImovelStore } from "store/imovel-store";


const Imoveis = props => {
  const columns = React.useMemo(() => COLUMNS_IMOVEIS, []);
  const data = useImovelStore(state=> state.imoveisData);
  const listImoveis = useImovelStore(state => state.listImoveis);
  const deleteImovel = useImovelStore(state => state.deleteImovel);
  const getSubRows = (row) => [] || row.subRows;

  React.useEffect(() => {
    if (data.length === 0) listImoveis();
  }, [listImoveis,data.length ]);

  React.useMemo(() => {
    if (columns.length === 8) {
      columns.push({
        Header: () => "AÇÕES ATUALIZAR/APAGAR",
        id: "action",
        Cell: ({ row }) => {
          return (
            <div className="d-flex flex-row">
              <div className="bd-highlight">
                <FormImovel
                  action={"update"}
                  data={row.original}
                  isModal={false}
                />
              </div>
              <div className="bd-highlight">
                <AlertDelete
                  id={row?.original?.id}
                  deleteData={(id) => {
                    deleteImovel(id);
                    listImoveis();
                  }}
                />
              </div>
              <div className="bd-highlight">
                <FormImovelDetalhe
                  isModal={false}
                  imovel_id={row.original.id}
                  refreshData={() => listImoveis()}
                />
              </div>
              <div className="bd-highlight">
                <FormImovelImagem
                  isModal={false}
                  imovel_id={row.original.id}
                />
              </div>
            </div>
          );
        },
      });

    }
  }, [columns,deleteImovel,listImoveis]);



  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    rows,
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
  } = useTable(
    {
      columns,
      data,
      getExportFileBlob,
      initialState: { pageIndex: 0 },
      getSubRows,
    },
    useGlobalFilter,
    usePagination,
    useExportData,
    useRowSelect,
  );
  const { pageIndex, pageSize } = state;

  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3">
        <BreadcrumbIcon
          description="Gerência de Imóveis"
          title="Imóveis"
          classIcon="fa fa-home fa-stack-1x fa-inverse"
        />
      </div>
      <div className="card border-0">
        <ul className="nav ps-4 pe-4 pb-2 pt-3">
          <ButtonExport
            exportData={exportData}
            getExportFileBlob={getExportFileBlob}
            pageOptions={pageOptions}
          />
          <li className="nav-item ms-auto pt-1">
            <FormImovel
              action={"create"}
              data={0}
              isModal={false}
            />
          </li>
        </ul>
        <div className="tab-content ps-4 pe-4 pb-4 pt-0">
          <div className="tab-pane fade show active" id="allTab">
            <TableFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <div className="table-responsive mb-3">
              <Table
                {...getTableProps()}
                className="table table-hover table-panel text-nowrap align-middle mb-0 table-sm"
                hidden={page.length > 0 ? false : true}
                responsive
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page?.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        className={i % 2 !== 0 ? "table-active" : ""}
                        {...row.getRowProps()}
                      >
                        {row.cells.map(cell => {
                          return (
                            <td
                              className="text-truncate"
                              style={{ maxWidth: "80px" }}
                              {...cell.getCellProps()}
                            >
                              <span className="fw-bold">
                                {cell.render("Cell")}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <TablePagination
              name="TablePaginationImoveis"
              nextPage={nextPage}
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              gotoPage={gotoPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              pageSize={pageSize}
              pageOptions={pageOptions}
              page={page}
              rows={rows.length}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Imoveis;

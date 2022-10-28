import React from "react"
import { useTable, useGlobalFilter, usePagination, useRowSelect } from 'react-table'
import { Table } from "reactstrap"
import { COLUMNS_IMOVEIS } from "components/table-column/table-column"
import { useExportData } from "react-table-plugins"
import ExportActionButton, { getExportFileBlob } from 'components/export_action_button/export_action_button'
import BreadcrumbIcon from 'components/breadcrumb-icon/breadcrumb-icon'

import AlertDelete from "components/alert-delete/alert-delete"
import FormImovel from "components/forms/form-imovel";
import FormImovelDetalhe from "components/forms/form-imovel-detalhe"
// import FormImovelImagem from "components/forms/form-imovel-imagem"

import TableFilter from 'components/table-filter/table-filter'
import TablePagination from 'components/table-pagination/table-pagination'

import { useDispatch, useSelector } from 'react-redux'
import { listImoveis, deleteImovel } from 'slices/imovel-slice'



const Imoveis = props => {

  const columns = React.useMemo(() => COLUMNS_IMOVEIS, [])
  const imovel = useSelector(state => state.imovelSlice);
  const dispatch = useDispatch();
  const data = React.useMemo(() => imovel, [imovel]);
  const getSubRows = (row) => [] || row.subRows;

  React.useMemo(() => {
    if (columns.length === 8) {
      columns.push({
        Header: () => 'AÇÕES ATUALIZAR/APAGAR',
        id: 'action',
        Cell: ({ row }) => {
          return (
            <div className="d-flex flex-row">
              <div className="bd-highlight">
                <FormImovel
                  action={'update'}
                  id={row?.original?.id}
                  isModal={false}
                />
              </div >
              <div className="bd-highlight">
                <AlertDelete
                  id={row?.original?.id}
                  deleteData={(id) => { dispatch(deleteImovel({ id })); dispatch(listImoveis()); }} />
              </div>
              <div className="bd-highlight">
                <FormImovelDetalhe
                  isModal={false}
                  id={row?.original?.id || 0}
                  imovel_id={row?.original?.id || 0}
                  refreshData={() => dispatch(listImoveis())}
                />
              </div>
              {/* <div className="bd-highlight"><FormImovelImagem isModal={false} isUpdated={true} id={row?.original?.id} /></div> */}
            </div >
          );
        },
      });
    }
  }, [columns, dispatch]);

  React.useEffect(() => {
    dispatch(listImoveis())
  }, [dispatch]);

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
  } = useTable({
    columns,
    data,
    getExportFileBlob,
    initialState: { pageIndex: 0 },
    getSubRows
  },
    useGlobalFilter,
    usePagination,
    useExportData,
    useRowSelect,
  );
  const { pageIndex, pageSize } = state

  return (
    <React.Fragment>
      <div className="d-flex align-items-center mb-3">
        <BreadcrumbIcon description="Gerência de Imóveis" title='Imóveis' classIcon='fa fa-home fa-stack-1x fa-inverse' />
      </div>
      <div className="card border-0">
        <ul className="nav ps-4 pe-4 pb-2 pt-3">
          <ExportActionButton exportData={exportData} getExportFileBlob={getExportFileBlob} pageOptions={pageOptions} />
          <li className="nav-item ms-auto pt-1">
            <FormImovel
              action={'create'}
              id={0}
              isModal={false}
            />
          </li>
        </ul>
        <div className="tab-content ps-4 pe-4 pb-4 pt-0">
          <div className="tab-pane fade show active" id="allTab">
            <TableFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
            <div className="table-responsive mb-3">
              <Table {...getTableProps()} className="table table-hover table-panel text-nowrap align-middle mb-0 table-sm" hidden={page.length > 0 ? false : true} responsive>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} >
                  {page?.map((row, i) => {
                    prepareRow(row)
                    return (
                      <tr className={i % 2 !== 0 ? "table-active" : ''} {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>
                            <span className="fw-bold" >{cell.render('Cell')}</span>
                          </td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
            <TablePagination
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
}

export default Imoveis
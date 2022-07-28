import React from "react";
import { Link } from "react-router-dom";
import { useTable, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { Button, Table } from "reactstrap";
import { COLUMNS_IMOVEIS } from "../components/table-column/table-column";
import { useExportData } from "react-table-plugins";
import TableFilter from '../components/table-filter/table-filter';
import FormImovel from "../components/forms/form-imovel";
// import AlertDelete from "../components/sweet-alert/alert-delete";
// import FormImovelDetalhe from "../components/forms/form-imovel-detalhe";
import FormImovelImagem from "../components/forms/form-imovel-imagem";
// import FormImovelDocumento from "../components/forms/form-imovel-documento";
import ImovelService from '../services/ImovelService';
import ButtonActionExport, { getExportFileBlob } from '../components/button-action-export/button-action-export';


function Imoveis() {
  const [data, setData] = React.useState([]);
  const columns = React.useMemo(() => COLUMNS_IMOVEIS, []);
  React.useEffect(() => loadingData(), [])

  React.useMemo(() => {
    if (columns.length === 8) {
      columns.push({
        Header: () => 'AÇÕES ATUALIZAR/APAGAR',
        id: 'action',
        Cell: ({ row }) => {
          return (
            <div className="d-flex flex-row">
              {/* <div className="bd-highlight"><FormImovel isModal={false} isUpdated={true} isInserted={false} isDeleted={false} isId={row.original.id} row={row.original} loadingData={loadingData} /></div> */}
              {/* <div className="bd-highlight"><AlertDelete rowID={row.original.id} deleteData={deleteData} /></div> */}
              {/* <div className="bd-highlight"><FormImovelDetalhe isModal={false} isUpdated={true} isId={row.original.id} row={row.original} /></div> */}
              <div className="bd-highlight"><FormImovelImagem isModal={false} isUpdated={true} id={row.original.id} /></div>
              {/* <div className="bd-highlight"><FormImovelDocumento isModal={false} isUpdated={true} isId={row.original.id} row={row.original} /></div> */}
            </div>
          );
        },
      });
    }
  }, [columns]);

  const loadingData = async () => {
    const result = await ImovelService.getAll('');
    setData(result);
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
    useExportData,
    useRowSelect,
  );
  const { pageIndex, pageSize } = state

  return (
    <div>

      <div className="d-flex align-items-center mb-3">
        <div>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/app">Principal</Link>
            </li>
            <li className="breadcrumb-item active">Imoveis</li>
          </ul>
          <h2 className="page-header mb-0"><strong><span className='fa-stack fa-lg'>
            <i className='fas fa-circle fa-stack-2x'></i>
            <i className='fa fa-home fa-stack-1x fa-inverse'></i>
          </span>Imóveis</strong></h2>
        </div>
      </div>
      <div className="card border-0">
        <ul className="nav px-3 py-3 ">
          <ButtonActionExport exportData={exportData} getExportFileBlob={getExportFileBlob} pageOptions={pageOptions} />
          <li className="nav-item me-2 ms-auto">
            <FormImovel
              isModal={false}
              isUpdated={false}
              isId={''}
              row={''}
              loadingData={loadingData}
            />
          </li>
        </ul>
        <div className="tab-content p-4">
          <div className="tab-pane fade show active" id="allTab">
            <TableFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
            <div className="table-responsive mb-3">
              <Table {...getTableProps()} className="table table-hover table-panel text-nowrap align-middle mb-0 table-sm" hidden={pageOptions.length > 0 ? false : true} responsive>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr  {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}  >
                  {page.map((row, i) => {
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
            <div className="d-md-flex align-items-center">
              <div className="me-md-auto text-md-left text-center mb-2 mb-md-0" hidden={pageOptions.length > 0 ? false : true}>
                Mostrando {pageIndex + 1} até {pageSize} com o total de {pageOptions.length} registros
              </div>
              <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-double-left" />
              </Button>
              <Button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-left" />
              </Button>
              <Button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-right" />
              </Button>
              <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-dark btn-icon btn-circle btn-lg me-2">
                <i className="fas fa-angle-double-right" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imoveis
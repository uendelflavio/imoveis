import React  from "react";
import { Link } from "react-router-dom";
import { COLUMNS_IMOVEIS } from "../components/table-column/columns";
import MOCK_DATA from '../components/MOCK_DATA.json'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import TableFilter from '../components/table-filter/table-filter'
import FormImovel from '../components/forms/form-imovel'

function Imoveis() {

  const columns = React.useMemo(() => COLUMNS_IMOVEIS, []);
  const data = React.useMemo(() => MOCK_DATA, []);


  const {
    getTableProps,
    getTableBodyProps,
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
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  },
    useGlobalFilter,
    usePagination
  );
  
  const { pageIndex, pageSize } = state

  function addNotification(notificationType, notificationTitle, notificationMessage, notificationPosition, notificationContent) {
    store.addNotification({
      title: notificationTitle,
      message: notificationMessage,
      type: notificationType,
      container: notificationPosition,
      insert: "top",      
      isMobile: true,
      showIcon:true,
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],            
      dismiss: { duration: 2000, onScreen : true  },
      dismissable: { click: true },
      content: notificationContent
    });
  }

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
          <h2 className="page-header mb-0"><strong><span class='fa-stack fa-lg'>
            <i className='fas fa-circle fa-stack-2x'></i>
            <i className='fa fa-home fa-stack-1x fa-inverse'></i>
          </span>Imóveis</strong></h2>
        </div>
      </div>
      <div className="card border-0">
        <ul className="nav px-3 py-3 ">
          <button type="button" onClick={() => addNotification('success', 'Sucesso', 'Ativou a Exportação do CSV', 'top-center')} className="btn btn-indigo btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-csv"></i>
          </button>
          <button type="button" onClick={() => addNotification('warning', 'Atencao', 'Ativou a Exportação do PDF', 'top-center')} className="btn btn-primary btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-pdf"></i>
          </button>
          <button type="button" onClick={() => addNotification('danger', 'Atencao', 'Ativou a Exportação do PDF', 'top-center')} className="btn btn-info btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-excel"></i>
          </button>
          <button type="button" onClick={() => addNotification('info', 'Atencao', 'Ativou a Exportação do TEXTO', 'top-center')} className="btn btn-lime btn-icon btn-circle btn-lg me-2">
            <i className="fa fa-file-alt"></i>
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
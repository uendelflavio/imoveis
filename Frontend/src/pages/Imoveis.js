import React, { useState }  from "react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';

function Imoveis() {

  const [modalDialog, setModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [sweetAlertDelete, setSweetAlertDelete] = useState(false);
  const [isId, setID] = useState('');


  
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'col1',
        Cell: e =><span  className="fw-bold" >{e.value}</span> 
      },
      {
        Header: () => 'ID LOCADOR', 
        accessor: 'col2',
        Cell: e =><Link to={'/app/locadores/'+e.value} className="fw-bold">{e.value}</Link>
      },
      {
        Header: 'ID CONTA',
        accessor: 'col3',        
        Cell: e =><Link to={'/app/contas/'+e.value} className="fw-bold">{e.value}</Link>
      },
      {
        Header: 'ENDERECO',
        accessor: 'col4',
      },
      {
        Header: 'NUMERO',
        accessor: 'col5',
      },
      {
        Header: 'BAIRRO',
        accessor: 'col6',
      },
      {
        Header: 'CEP',
        accessor: 'col7',
      },
      {
        Header: 'CIDADE',
        accessor: 'col8',
      },
      {
        Header: 'VISTORIA',
        accessor: 'col9',                                 
        Cell: e => e.value === 'SIM' ? <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i className="fa fa-circle fs-9px fa-fw me-5px"></i>{e.value}</span> : <span className="badge border border-danger text-danger px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i className="fa fa-circle fs-9px fa-fw me-5px"></i>{e.value}</span>                
      },
      {
        Header: 'OCUPADO',
        accessor: 'col10',
        Cell: e => e.value === 'SIM' ? <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i className="fa fa-circle fs-9px fa-fw me-5px"></i>{e.value}</span> : <span className="badge border border-danger text-danger px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center"><i className="fa fa-circle fs-9px fa-fw me-5px"></i>{e.value}</span>                
      },
      {
        Header: () => 'AÇÕES', // No header
        id: 'action', // It needs an ID
        Cell: ({ row }) => (
          <ul className="nav px-1 py-1 ">
            <li className="nav-item">                                         
                <button
                  type="button"
                  onClick={() => toggleModal('modalDialog',true, row.original.col1)}
                  className="btn btn-warning btn-icon btn-circle btn-lg me-2">
                  <i className="fa fa-check "></i>                          
                </button>
                <button
                  type="button"
                  onClick={() => toggleSweetAlert('delete')}
                  className="btn btn-danger btn-icon btn-circle btn-lg me-2">
                  <i className="fa fa-minus"></i>
                </button>
            </li>
          </ul>
        ),
      }],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []    
  );
  
  const data = React.useMemo(
     () => [
       {
         col1: 'IMO-001',
         col2: 'LOC-001',
         col3: 'CON-001',
         col4: 'World3',
         col5: 'World5',
         col6: 'World6',
         col7: 'World7',
         col8: 'World8',
         col9: 'SIM',
         col10: 'NÃO',
       },
       {
         col1: 'IMO-002',
         col2: 'LOC-002',
         col3: 'CON-002',
         col4: 'World3',
         col5: 'World5',
         col6: 'World6',
         col7: 'World7',
         col8: 'World8',
         col9: 'NÃO',
         col10: 'NÃO',
       },
       {
         col1: 'IMO-003',
         col2: 'LOC-003',
         col3: 'CON-003',
         col4: 'World3',
         col5: 'World5',
         col6: 'World6',
         col7: 'World7',
         col8: 'World8',
         col9: 'SIM',
         col10: 'SIM',
       },
     ],
     []
   )



  const {
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  },
    useGlobalFilter
  );
  
// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (          
  <div className="input-group mb-3">
    <button
      className="btn btn-white"
      type="button">
      <span className="d-none d-md-inline">Filtrar Imoveis</span>
    </button>
    <div className="flex-fill position-relative">
      <div className="input-group">
        <div className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0" style={{ zIndex: 10 }}
        >
          <i className="fa fa-search opacity-5"></i>
        </div>
        <input
            value={value || ""}
            onChange={e => {
              setValue(e.target.value);
              onChange(e.target.value);
              
            }}
            type="text"
            autoFocus
            className="form-control px-35px bg-light"
            placeholder={`${count} registros...`}
        />
      </div>
    </div>
  </div>
  )
}

  function toggleModal (name,type_button,linha){
    switch (name) {
      case 'modalDialog':  
        setIsUpdated(type_button);  
        setModal(!modalDialog);  
        setID(linha)
        break;         
      default:
        break;
    }
  }

   function toggleSweetAlert (name){
		switch(name) {
			case 'delete':
        setSweetAlertDelete(!sweetAlertDelete);
				break;
			default:
				break;
		}
	}

  function addNotification (notificationType, notificationTitle, notificationMessage, notificationPosition, notificationContent){
    store.addNotification({
			title: notificationTitle,
			message: notificationMessage,
			type: notificationType,
			insert: "top",
			container: notificationPosition,
			animationIn: ["animated", "fadeIn"],
			animationOut: ["animated", "fadeOut"],
			dismiss: { duration: 2000 },
			dismissable: { click: true },
			content: notificationContent
		});
  }
  
    return (
      <div>
     
        <Modal centered isOpen={modalDialog} toggle={() => toggleModal('modalDialog')}>
          <ModalHeader toggle={() => toggleModal('modalDialog')} close={<button className="btn-close" onClick={() => toggleModal('modalDialog')}></button>}>{!isUpdated ? 'Incluir Novo Imóvel': '['+isId+'] - Atualizar Imóvel '}</ModalHeader>
          <ModalBody>
            ...
          </ModalBody>
          <ModalFooter>
            <button className={`btn ${!isUpdated ? 'btn-success' : 'btn-warning'}`} >{!isUpdated ? 'Incluir' : 'Atualizar'}</button>
            <button className="btn btn-inverse" onClick={() => toggleModal('modalDialog')}>Sair</button>                         
          </ModalFooter>
        </Modal>

        {(sweetAlertDelete &&
          <SweetAlert danger showCancel
            confirmBtnText="Sim, Excluir agora!"
            cancelBtnText="Cancelar"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Deseja excluir o registro?"
            onConfirm={() => toggleSweetAlert('delete')}
            onCancel={() => toggleSweetAlert('delete')}
          >
            Esta ação vai excluir permanentemente os dados!
          </SweetAlert>
        )}

        <div className="d-flex align-items-center mb-3">
          <div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/app">Principal</Link>
              </li>
              <li className="breadcrumb-item active">Imoveis</li>
            </ul>
            <h2 className="page-header mb-0"><strong><span class='fa-stack fa-lg'>
              <i class='fas fa-circle fa-stack-2x'></i>
              <i class='fa fa-home fa-stack-1x fa-inverse'></i>
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
              {/*<button className="btn btn-default me-2"  type="text"><span class='fa-stack fa-sm'><i class='fas fa-circle fa-stack-2x'></i><i class='fa fa-file-csv fa-stack-1x fa-inverse'></i></span>Exportar CSV<br></br></button>    
              <button className="btn btn-default me-2"  type="text"><span class='fa-stack fa-sm'><i class='fas fa-circle fa-stack-2x'></i><i class='fa fa-file-pdf fa-stack-1x fa-inverse'></i></span>Exportar PDF<br></br></button>
              <button className="btn btn-default me-2"  type="text"><span class='fa-stack fa-sm'><i class='fas fa-circle fa-stack-2x'></i><i class='fa fa-file-excel fa-stack-1x fa-inverse'></i></span>Exportar EXCEL<br></br></button>
              <button className="btn btn-default me-2" type="text"><span class='fa-stack fa-sm'><i class='fas fa-circle fa-stack-2x'></i><i class='fa fa-file-alt fa-stack-1x fa-inverse'></i></span>Exportar TEXTO<br></br></button>        
              */}
            <li className="nav-item me-2 ms-auto">
              <button
                type="button" onClick={() => setModal('modalDialog', false,'')} className="btn btn-success btn-icon btn-circle btn-lg me-2">              
                <i className="fa fa-plus"></i>
              </button>
            </li>
          </ul>
          <div className="tab-content p-3">
            <div className="tab-pane fade show active" id="allTab">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              <div className="table-responsive mb-3">                
                <table{...getTableProps()} striped className="table table-hover table-panel text-nowrap align-middle mb-0"  > 
                  <thead>
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                      </tr>
                    ))}
                    
                  </thead>
                  
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                      prepareRow(row)                      
                            return (
                              <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                  if (cell.column.id === '') {
                                        return <td>
                                        <ul className="nav px-3 py-3 ">
                                        <li className="nav-item">                                         
                                          <button
                                            type="button"
                                            onClick={() => toggleModal('modalDialog', true)}
                                            className="btn btn-warning btn-icon btn-circle btn-lg me-2">
                                            <i className="fa fa-check "></i>                          
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => toggleSweetAlert('delete')}
                                            className="btn btn-danger btn-icon btn-circle btn-lg me-2">
                                            <i className="fa fa-minus"></i>
                                          </button>
                                          </li>
                                          </ul>
                                        </td>
                                  }                            
                                  return <td {...cell.getCellProps()}>                                    
                                    <span  className="fw-bold" >{cell.render('Cell')}</span>
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
                  Mostrando 1 até 10 com o total de 57 registros
                </div>
                <Pagination className="pagination mb-0 justify-content-center" >
                    <PaginationItem>
                      <PaginationLink className="page-link" previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        4
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        5
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink next href="#" />
                    </PaginationItem>
                  </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}


export default Imoveis
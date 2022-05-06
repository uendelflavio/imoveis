import { Link } from "react-router-dom";

export const COLUMNS_IMOVEIS = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: e => <span className="fw-bold" >{(e.value).toString().padStart(3, "0") }</span>
  },
  {
    Header: () => 'ID LOCADOR',
    accessor: 'id_locador',
    Cell: e => <Link to={'/app/locadores/' + e.value} className="fw-bold">{e.value}</Link>
  },
  {
    Header: 'ID CONTA',
    accessor: 'id_conta',
    Cell: e => <Link to={'/app/contas/' + e.value} className="fw-bold">{e.value}</Link>
  },
  {
    Header: 'ENDERECO',
    accessor: 'endereco',
  },
  {
    Header: 'NUMERO',
    accessor: 'numero',
  },
  {
    Header: 'BAIRRO',
    accessor: 'bairro',
  },
  {
    Header: 'CEP',
    accessor: 'cep',
  },
  {
    Header: 'CIDADE',
    accessor: 'cidade',
  },
  {
    Header: 'VISTORIA',
    accessor: 'vistoria',
    Cell: e => e.value ? <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">SIM&nbsp;<i className="fa fa-circle fs-9px fa-fw"></i>{e.value}</span> : <span className="badge border border-danger text-danger px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">NÃO&nbsp;<i className="fa fa-circle fs-9px fa-fw"></i></span>
  },
  {
    Header: 'OCUPADO',
    accessor: 'ocupado',
    Cell: e => e.value ? <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">SIM&nbsp;<i className="fa fa-circle fs-9px fa-fw"></i>{e.value}</span> : <span className="badge border border-danger text-danger px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">NÃO&nbsp;<i className="fa fa-circle fs-9px fa-fw"></i></span>
  }];
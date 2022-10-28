import React from "react";
// import AlertDelete from "../alert-delete/alert-delete"
// import FormImovelDetalhe from "../forms/form-imovel-detalhe"
// import FormImovelImagem from "../forms/form-imovel-imagem"
// import FormImovel from "../forms/form-imovel";
// import { useDispatch } from 'react-redux'
// import { listImovel, deleteImovel, updateImovel } from '../../slices/imovel-slice'


export const COLUMNS_IMOVEIS = [
  {
    Header: 'ID',
    accessor: 'id',
    Cell: e => e.value ? <span className="fw-bold" >{(e.value).toString().padStart(3, "0")}</span> : ''
  },
  {
    Header: 'ENDERECO',
    accessor: 'endereco',
    maxWidth: 100,
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
  },
];



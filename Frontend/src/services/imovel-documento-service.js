import API from 'utils/api';
import { URL_DOCUMENTO_IMOVEIS } from 'constants/urls';

const getAll = async (data) => {
  return await API.get(URL_DOCUMENTO_IMOVEIS, data)
    .then(response => response.data)
    .catch(error => error);
};

const get = async (id) => {
  return await API.get(`${URL_DOCUMENTO_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};

const create = async (data) => {
  return await API.post(URL_DOCUMENTO_IMOVEIS, { "imovel_documentos": data })
    .then(response => response.data)
    .catch(error => error);
};

const update = async (id, data) => {
  return await API.put(`${URL_DOCUMENTO_IMOVEIS}/${id}`, { "imovel_documentos": data })
    .then(response => response.data)
    .catch(error => error);
};

const remove = async (id) => {
  return await API.delete(`${URL_DOCUMENTO_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};

const ImovelDocumentoService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ImovelDocumentoService;

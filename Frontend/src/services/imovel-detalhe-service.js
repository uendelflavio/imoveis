import API from 'utils/api';
import { URL_DETALHE_IMOVEIS } from 'constants/url-constants';

const getAll = async (data) => {
  return await API.get(URL_DETALHE_IMOVEIS, data)
    .then(response => response.data)
    .catch(error => error);
};

const get = async (id) => {
  return await API.get(`${URL_DETALHE_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};

const create = async (data) => {
  return await API.post(URL_DETALHE_IMOVEIS, { "imovel_detalhe": data })
    .then(response => response.data)
    .catch(error => error);
};

const update = async (id, data) => {
  return await API.put(`${URL_DETALHE_IMOVEIS}/${id}`, { "imovel_detalhe": data })
    .then(response => response.data)
    .catch(error => error);
};

const remove = async (id) => {
  return await API.delete(`${URL_DETALHE_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};

const removeAll = async () => {
  return await API.delete(URL_DETALHE_IMOVEIS)
    .then(response => response.data)
    .catch(error => error);
};

const findByTitle = async (title) => {
  return await API.get(URL_DETALHE_IMOVEIS`?title=${title}`)
    .then(response => response.data)
    .catch(error => error);
};

const ImovelDetalheService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ImovelDetalheService;

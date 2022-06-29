import API from '../utils/api';
import { URL_DETALHE_IMOVEIS } from '../constants/urls';

const getAll = async (data) => {
  return await API.get(URL_DETALHE_IMOVEIS, data);
};

const get = async (id) => {
  return await API.get(URL_DETALHE_IMOVEIS + id);
};

const create = async (data) => {
  data = { "imovel": data }
  return await API.post(URL_DETALHE_IMOVEIS, data);
};

const update = async (id, data) => {
  data = { "imovel": data }
  return await API.put(URL_DETALHE_IMOVEIS + id, data);
};

const remove = async (id) => {
  return await API.delete(URL_DETALHE_IMOVEIS + id);
};

const removeAll = async () => {
  return await API.delete(URL_DETALHE_IMOVEIS);
};

const findByTitle = async (title) => {
  return await API.get(URL_DETALHE_IMOVEIS`?title=${title}`);
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

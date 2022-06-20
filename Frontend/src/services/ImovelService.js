import API from '../utils/api';
import { URL_IMOVEIS } from '../constants/urls';

const getAll = async (data) => {
  return await API.get(URL_IMOVEIS, data);
};

const get = async (id) => {
  return await API.get(URL_IMOVEIS + id);
};

const create = async (data) => {
  data = { "imovel": data }
  return await API.post(URL_IMOVEIS, data);
};

const update = async (id, data) => {
  data = { "imovel": data }
  return await API.put(URL_IMOVEIS + id, data);
};

const remove = async (id) => {
  return await API.delete(URL_IMOVEIS + id);
};

const removeAll = async () => {
  return await API.delete(URL_IMOVEIS);
};

const findByTitle = async (title) => {
  return await API.get(URL_IMOVEIS`?title=${title}`);
};

const ImovelService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ImovelService;


import API from '../utils/api';
import { URL_IMOVEIS } from '../constants/urls';


const getAll = (params) => {
  return API.get(URL_IMOVEIS, { params }, { headers: { 'Content-Type': 'application/json' } });
};

const get = (id) => {
  return API.get(URL_IMOVEIS`${id}`, { headers: { 'Content-Type': 'application/json' } });
};

const create = (data) => {
  return API.post(URL_IMOVEIS, data, { headers: { 'Content-Type': 'application/json' } });
};

const update = (id, data) => {
  return API.put(URL_IMOVEIS`${id}`, data, { headers: { 'Content-Type': 'application/json' } });
};

const remove = (id) => {
  return API.delete(URL_IMOVEIS`${id}`, { headers: { 'Content-Type': 'application/json' } });
};

const removeAll = () => {
  return API.delete(URL_IMOVEIS, { headers: { 'Content-Type': 'application/json' } });
};

const findByTitle = (title) => {
  return API.get(URL_IMOVEIS`?title=${title}`, { headers: { 'Content-Type': 'application/json' } });
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
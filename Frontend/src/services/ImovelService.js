
import API from '../utils/api';
import { URL_IMOVEIS } from '../constants/urls';


const getAll = async (params) => {
  return await API.get(URL_IMOVEIS, { params }, { headers: { 'Content-Type': 'application/json' } });
};

const get = async (id) => {
  return await API.get(URL_IMOVEIS`${id}`, { headers: { 'Content-Type': 'application/json' } });
};

const create = async (data) => {
  return await API.post(URL_IMOVEIS, data, { headers: { 'Content-Type': 'application/json' } });
};

const update = async (id, data) => {
  return await API.put(URL_IMOVEIS`${id}`, data, { headers: { 'Content-Type': 'application/json' } });
};

const remove = async (id) => {
  return await API.delete(URL_IMOVEIS`${id}`, { headers: { 'Content-Type': 'application/json' } });
};

const removeAll = async () => {
  return await API.delete(URL_IMOVEIS, { headers: { 'Content-Type': 'application/json' } });
};

const findByTitle = async (title) => {
  return await API.get(URL_IMOVEIS`?title=${title}`, { headers: { 'Content-Type': 'application/json' } });
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

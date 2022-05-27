
import API from '../utils/api';


const getAll = (params) => {
  return API.get("/api/imoveis/", { params });
};

const get = (id) => {
  return API.get(`/api/imoveis/${id}`);
};

const create = (data) => {
  return API.post("/api/imoveis/", data);
};

const update = (id, data) => {
  return API.put(`/api/imoveis/${id}`, data);
};

const remove = (id) => {
  return API.delete(`/api/imoveis/${id}`);
};

const removeAll = () => {
  return API.delete(`/api/imoveis`);
};

const findByTitle = (title) => {
  return API.get(`/api/imoveis?title=${title}`);
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
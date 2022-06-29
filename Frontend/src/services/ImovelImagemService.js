import API from '../utils/api';
import { URL_IMAGEM_IMOVEIS } from '../constants/urls';

const getAll = async (data) => {
  return await API.get(URL_IMAGEM_IMOVEIS, data);
};

const get = async (id) => {
  return await API.get(URL_IMAGEM_IMOVEIS + id);
};

const create = async (data) => {
  data = { "imovel": data }
  return await API.post(URL_IMAGEM_IMOVEIS, data);
};

const update = async (id, data) => {
  data = { "imovel": data }
  return await API.put(URL_IMAGEM_IMOVEIS + id, data);
};

const remove = async (id) => {
  return await API.delete(URL_IMAGEM_IMOVEIS + id);
};


const ImovelImagemService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ImovelImagemService;

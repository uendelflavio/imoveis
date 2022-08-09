import API from '../utils/api';
import { URL_IMAGEM_IMOVEIS } from '../constants/urls';

const getAll = async (data) => {
  return await API.get(URL_IMAGEM_IMOVEIS, data)
    .then(response => response.data)
    .catch(error => error);
};

const get = async (id) => {
  return await API.get(`${URL_IMAGEM_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};

const getCount = async (id) => {
  return await API.get(`${URL_IMAGEM_IMOVEIS}/count/${id}`)
    .then(response => response.data.imagens)
    .catch(error => error);
};

const create = async (data) => {
  data = { "imovel_imagem": data }
  console.log(data)
  return await API.post(URL_IMAGEM_IMOVEIS, data)
    .then(response => response.data)
    .catch(error => error);
};

const update = async (id, data) => {
  data = { "imovel_imagem": data }
  return await API.put(`${URL_IMAGEM_IMOVEIS}/${id}`, data)
    .then(response => response.data)
    .catch(error => error);
};

const remove = async (id) => {
  return await API.delete(`${URL_IMAGEM_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};


const ImovelImagemService = {
  getAll,
  get,
  getCount,
  create,
  update,
  remove,
};

export default ImovelImagemService;

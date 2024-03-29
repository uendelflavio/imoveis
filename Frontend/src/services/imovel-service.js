import API from "utils/api";
import { URL_IMOVEIS } from "constants/url-constants";

const getAll = async data => {
  return await API.get(URL_IMOVEIS, data)
    .then(response => response.data.imoveis)
    .catch(error => error);
};

const get = async id => {
  return await API.get(`${URL_IMOVEIS}/${id}`)
    .then(response => response.data.imovel)
    .catch(error => error);
};

const getWithImages = async id => {
  return await API.get(`${URL_IMOVEIS}/imagens/${id}`)
    .then(response => response.data.imovel_imagem)
    .catch(error => error);
};

const getWithDetalhes = async id => {
  return await API.get(`${URL_IMOVEIS}/detalhes/${id}`)
    .then(response => response.data.imovel_detalhe)
    .catch(error => error);
};

const getWithDocuments = async id => {
  return await API.get(`${URL_IMOVEIS}/documentos/${id}`)
    .then(response => response.data.imovel_documento)
    .catch(error => error);
};

const create = async data => {
  return await API.post(URL_IMOVEIS, { imovel: data })
    .then(response => response.data)
    .catch(error => error);
};

const update = async (id, data) => {
  return await API.put(`${URL_IMOVEIS}/${id}`, { imovel: data })
    .then(response => response)
    .catch(error => error);
};

const remove = async id => {
  return await API.delete(`${URL_IMOVEIS}/${id}`)
    .then(response => response.data)
    .catch(error => error);
};

const removeAll = async () => {
  return await API.delete(URL_IMOVEIS)
    .then(response => response.data)
    .catch(error => error);
};

// const findByTitle = async title => {
//   return await API.get(`${URL_IMOVEIS}?title=${title}`)
//     .then(response => response.data)
//     .catch(error => error);
// };

const ImovelService = {
  get,
  getAll,
  getWithImages,
  getWithDetalhes,
  getWithDocuments,
  create,
  update,
  remove,
  removeAll
};

export default ImovelService;

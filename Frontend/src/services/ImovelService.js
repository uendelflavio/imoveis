
import API from '../utils/api';

  /*
  ImoveisGet = Event =>{
    API
    .get(`api/imoveis`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.headers);
      console.log(res.config);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  ImoveisPost= Event =>{
    API.post(`api/imoveis`,{
      nome: "Romulo",
      sobrenome: "Sousa"
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.headers);
      console.log(res.config);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  ImoveisPut = Event =>{
    API.put(`api/imoveis`,{
      nome: "Romulo",
      sobrenome: "Sousa"
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.headers);
      console.log(res.config);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  ImoveisDelete = Event =>{
    API.delete(`api/imoveis`,{
      id: "1"      
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      console.log(res.headers);
      console.log(res.config);
    });
  }
*/




const getAll = (params) => {
  return API.get("/tutorials", { params });
};

const get = (id) => {
  return API.get(`/api/imoveis/${id}`);
};

const create = (data) => {
  return API.post("/api/imoveis", data);
};

const update = (id, data) => {
  return API.put(`/api/imoveis${id}`, data);
};

const remove = (id) => {
  return API.delete(`/api/imoveis${id}`);
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